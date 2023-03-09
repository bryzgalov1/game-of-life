import React, {
    forwardRef,
    ForwardRefRenderFunction,
    memo,
    MouseEventHandler,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
} from 'react';
import { useEffect } from 'react';

import { COLOR_HIDE, COLOR_SHOW } from '../../config';

import { CellStatus } from '../../LifeMap/types';

import log from '../../utils/log';

import './style.css';

type TColor = string | null;

export type TDrawColor = {
    show: TColor;
    hide: TColor;
};

type TProps = {
    width: number;
    height: number;
    cellSize: number;
    showGrid: boolean;
    onCellClick?: (cellX: number, cellY: number) => void;
};

type TDrawCell = (cellX: number, cellY: number, color: TColor) => void;
type TDrawCells = (viewCurrent: Uint8Array, cache?: boolean) => void;

export type TCanvasHandles = {
    drawCell: TDrawCell;
    drawCells: TDrawCells;
};

type TCanvasElement = ForwardRefRenderFunction<TCanvasHandles, TProps>;

const Canvas: TCanvasElement = (props, ref) => {
    const {
        width,
        height,
        cellSize,
        showGrid,
        onCellClick,
    } = props;

    const canvasWrapRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const viewPrevRef = useRef<Uint8Array | null>(null);

    const getContext2D = (): CanvasRenderingContext2D | null => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                return context;
            }
        }
        log.error('no CanvasRenderingContext2D');
        return null;
    };

    const _drawCell = useCallback((сontext2D: CanvasRenderingContext2D, cellX: number, cellY: number, color: TColor) => {
        const x = cellX * cellSize;
        const y = cellY * cellSize;

        const w = cellSize;
        const h = cellSize;

        if (color) {
            сontext2D.fillStyle = color;
            сontext2D.fillRect(x, y, w, h);
        } else {
            сontext2D.clearRect(x, y, w, h);
        }
        // сontext2D.fillStyle = '#cccccc';
        // сontext2D.fillText(`${cellX}_${cellY}`, x, y + h / 2);
    }, [
        cellSize,
    ]);

    const drawCell: TDrawCell = useCallback((cellX, cellY, color) => {
        log.time('drawCell');
        const сontext2D = getContext2D();
        if (сontext2D) {
            _drawCell(сontext2D, cellX, cellY, color);
        }
        log.timeEnd('drawCell');
    }, [
        _drawCell,
    ]);

    const drawCells: TDrawCells = useCallback((viewCurrent, cache = false) => {
        log.time('drawCells');
        const сontext2D = getContext2D();
        if (сontext2D) {
            let index = 0;

            const drawCall = (cellX: number, cellY: number) => {
                const statusMain = viewCurrent[index];

                if (viewPrevRef.current) {
                    const color = statusMain === CellStatus.DEAD ? COLOR_HIDE : COLOR_SHOW;
                    const statusPrev = viewPrevRef.current[index];

                    if (statusMain !== statusPrev) {
                        _drawCell(сontext2D, cellX, cellY, color);
                    }
                } else {
                    const color = statusMain === CellStatus.DEAD ? null : COLOR_SHOW;
                    _drawCell(сontext2D, cellX, cellY, color);
                }
            };

            for (let cellY = 0; cellY < height; cellY++) {
                for (let cellX = 0; cellX < width; cellX++) {
                    drawCall(cellX, cellY);
                    index++;
                }
            }

            if (cache) {
                viewPrevRef.current = new Uint8Array(viewCurrent);
            } else {
                viewPrevRef.current = null;
            }
        }
        log.timeEnd('drawCells');
    }, [
        width,
        height,
        _drawCell,
    ]);

    useImperativeHandle(ref, () => ({
        drawCell,
        drawCells,
    }));

    const onClickCallback: MouseEventHandler<HTMLCanvasElement> = useCallback((event) => {
        if (canvasRef.current && onCellClick) {
            const rect = canvasRef.current.getBoundingClientRect();
            const xPosition = event.clientX - rect.left;
            const yPosition = event.clientY - rect.top;

            const cellX = Math.floor(xPosition / (cellSize));
            const cellY = Math.floor(yPosition / (cellSize));

            onCellClick(cellX, cellY);
        }
    }, [
        cellSize,
        onCellClick,
    ]);

    const onClickCanvas: MouseEventHandler<HTMLCanvasElement> | undefined = useMemo(() => {
        if (onCellClick) {
            return onClickCallback;
        }
    }, [
        onCellClick,
        onClickCallback,
    ]);

    const setCanvasCss = useCallback(() => {
        if (canvasWrapRef.current) {
            const canvasWidth = width * cellSize;
            const canvasHeight = height * cellSize;

            let cssText = `
                width: ${canvasWidth}px;
                height: ${canvasHeight}px;
            `;

            if (showGrid) {
                // const color = '#ff0000';
                const color = '#ffd700';
                cssText = cssText + `
                    background-image: 
                    repeating-linear-gradient(to right, transparent, transparent ${cellSize - 1}px, ${color}, ${color} ${cellSize}px),
                    repeating-linear-gradient(to bottom, transparent, transparent ${cellSize - 1}px, ${color}, ${color} ${cellSize}px);
                `;
            }
            canvasWrapRef.current.style.cssText = cssText;
        }
    }, [
        width,
        height,
        cellSize,
        showGrid,
    ]);

    useEffect(() => {
        setCanvasCss();
    }, [
        setCanvasCss,
    ]);

    const canvasWidth = width * cellSize;
    const canvasHeight = height * cellSize;

    return (
        <div className='Canvas'>
            <div
                className='Canvas__body'
                ref={canvasWrapRef}
            >
                <canvas
                    className='Canvas__element'
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    onClick={onClickCanvas}
                />
            </div>
        </div>
    );
};

export default memo(forwardRef(Canvas));
