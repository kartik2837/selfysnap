// import React, { useState, useRef, useEffect } from "react";
// import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from "react-konva";
// import useImage from "use-image";

// interface PrintArea {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// }

// interface PrintAreaSelectorProps {
//   mockupImage: string;
//   mockupWidth: number;
//   mockupHeight: number;
//   value: PrintArea;
//   onChange: (area: PrintArea) => void;
// }

// const PrintAreaSelector: React.FC<PrintAreaSelectorProps> = ({
//   mockupImage,
//   mockupWidth,
//   mockupHeight,
//   value,
//   onChange,
// }) => {
//   const [img] = useImage(mockupImage);
//   const stageRef = useRef<any>(null);
//   const shapeRef = useRef<any>(null);
//   const trRef = useRef<any>(null);
//   const [selected, setSelected] = useState(false);

//   const displayWidth = 500;
//   const displayHeight = mockupHeight
//     ? (mockupHeight / mockupWidth) * displayWidth
//     : 500;

//   const scaleX = mockupWidth ? displayWidth / mockupWidth : 1;
//   const scaleY = mockupHeight ? displayHeight / mockupHeight : 1;

//   useEffect(() => {
//     if (selected && trRef.current && shapeRef.current) {
//       trRef.current.nodes([shapeRef.current]);
//       trRef.current.getLayer()?.batchDraw();
//     }
//   }, [selected]);

//   const handleDragEnd = (e: any) => {
//     onChange({
//       ...value,
//       x: Math.round(e.target.x() / scaleX),
//       y: Math.round(e.target.y() / scaleY),
//     });
//   };

//   const handleTransformEnd = () => {
//     const node = shapeRef.current;
//     const scaleXNow = node.scaleX();
//     const scaleYNow = node.scaleY();

//     node.scaleX(1);
//     node.scaleY(1);

//     onChange({
//       x: Math.round(node.x() / scaleX),
//       y: Math.round(node.y() / scaleY),
//       width: Math.round((node.width() * scaleXNow) / scaleX),
//       height: Math.round((node.height() * scaleYNow) / scaleY),
//     });
//   };

//   return (
//     <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-orange-300">
//       <p className="text-xs text-gray-600 mb-2 font-semibold">
//         🎯 Drag the orange box to set print area — resize from corners
//       </p>
//       <div className="flex justify-center">
//         <Stage
//           width={displayWidth}
//           height={displayHeight}
//           ref={stageRef}
//           style={{ borderRadius: 8, overflow: "hidden" }}
//         >
//           <Layer>
//             {/* Mockup background */}
//             {img && (
//               <KonvaImage
//                 image={img}
//                 width={displayWidth}
//                 height={displayHeight}
//               />
//             )}

//             {/* Print area rectangle */}
//             <Rect
//               ref={shapeRef}
//               x={value.x * scaleX}
//               y={value.y * scaleY}
//               width={value.width * scaleX}
//               height={value.height * scaleY}
//               fill="rgba(249, 115, 22, 0.25)"
//               stroke="#f97316"
//               strokeWidth={2}
//               dash={[8, 4]}
//               draggable
//               onClick={() => setSelected(true)}
//               onTap={() => setSelected(true)}
//               onDragEnd={handleDragEnd}
//               onTransformEnd={handleTransformEnd}
//             />

//             {selected && (
//               <Transformer
//                 ref={trRef}
//                 boundBoxFunc={(oldBox, newBox) => {
//                   if (newBox.width < 20 || newBox.height < 20) return oldBox;
//                   return newBox;
//                 }}
//               />
//             )}
//           </Layer>
//         </Stage>
//       </div>
//       <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
//         <div>
//           <label className="block text-gray-500">X</label>
//           <input
//             type="number"
//             value={value.x}
//             onChange={(e) =>
//               onChange({ ...value, x: Number(e.target.value) })
//             }
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-500">Y</label>
//           <input
//             type="number"
//             value={value.y}
//             onChange={(e) =>
//               onChange({ ...value, y: Number(e.target.value) })
//             }
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-500">Width</label>
//           <input
//             type="number"
//             value={value.width}
//             onChange={(e) =>
//               onChange({ ...value, width: Number(e.target.value) })
//             }
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-500">Height</label>
//           <input
//             type="number"
//             value={value.height}
//             onChange={(e) =>
//               onChange({ ...value, height: Number(e.target.value) })
//             }
//             className="w-full border rounded px-2 py-1"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrintAreaSelector;







import React, { useState, useRef, useEffect } from "react";

interface PrintArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PrintAreaSelectorProps {
  mockupImage: string;
  mockupWidth: number;
  mockupHeight: number;
  value: PrintArea;
  onChange: (area: PrintArea) => void;
}

const PrintAreaSelector: React.FC<PrintAreaSelectorProps> = ({
  mockupImage,
  mockupWidth,
  mockupHeight,
  value,
  onChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  });

  const displayWidth = 500;
  const displayHeight = mockupHeight
    ? Math.round((mockupHeight / mockupWidth) * displayWidth)
    : 500;

  const scaleX = mockupWidth ? displayWidth / mockupWidth : 1;
  const scaleY = mockupHeight ? displayHeight / mockupHeight : 1;

  const handleBoxMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setDragStart({
      x: e.clientX - value.x * scaleX,
      y: e.clientY - value.y * scaleY,
      startX: value.x,
      startY: value.y,
    });
  };

  const handleCornerMouseDown = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setResizing(corner);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      startX: value.x,
      startY: value.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dragging) {
        const newX = (e.clientX - dragStart.x) / scaleX;
        const newY = (e.clientY - dragStart.y) / scaleY;

        onChange({
          ...value,
          x: Math.max(0, Math.min(mockupWidth - value.width, Math.round(newX))),
          y: Math.max(
            0,
            Math.min(mockupHeight - value.height, Math.round(newY))
          ),
        });
      } else if (resizing) {
        const dx = (e.clientX - dragStart.x) / scaleX;
        const dy = (e.clientY - dragStart.y) / scaleY;

        let newW = value.width;
        let newH = value.height;
        let newX = dragStart.startX;
        let newY = dragStart.startY;

        if (resizing.includes("e")) {
          newW = Math.max(20, value.width + dx);
        }
        if (resizing.includes("s")) {
          newH = Math.max(20, value.height + dy);
        }
        if (resizing.includes("w")) {
          newW = Math.max(20, value.width - dx);
          newX = dragStart.startX + (value.width - newW);
        }
        if (resizing.includes("n")) {
          newH = Math.max(20, value.height - dy);
          newY = dragStart.startY + (value.height - newH);
        }

        newX = Math.max(0, newX);
        newY = Math.max(0, newY);
        newW = Math.min(mockupWidth - newX, newW);
        newH = Math.min(mockupHeight - newY, newH);

        onChange({
          x: Math.round(newX),
          y: Math.round(newY),
          width: Math.round(newW),
          height: Math.round(newH),
        });
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
      setResizing(null);
    };

    if (dragging || resizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    dragging,
    resizing,
    dragStart,
    value,
    scaleX,
    scaleY,
    mockupWidth,
    mockupHeight,
    onChange,
  ]);

  return (
    <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-orange-300">
      <p className="text-xs text-gray-600 mb-2 font-semibold">
         Drag the orange box to set print area — resize from corners
      </p>

      <div className="flex justify-center">
        <div
          ref={containerRef}
          className="relative select-none overflow-hidden rounded-lg"
          style={{
            width: displayWidth,
            height: displayHeight,
            cursor: dragging ? "grabbing" : "default",
          }}
        >
          <img
            src={mockupImage}
            alt="Mockup"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            draggable={false}
          />

          <div
            onMouseDown={handleBoxMouseDown}
            className="absolute"
            style={{
              left: value.x * scaleX,
              top: value.y * scaleY,
              width: value.width * scaleX,
              height: value.height * scaleY,
              background: "rgba(249, 115, 22, 0.3)",
              border: "2px dashed #f97316",
              borderRadius: "4px",
              cursor: dragging ? "grabbing" : "move",
            }}
          >
            {[
              {
                pos: "nw",
                style: { left: -6, top: -6 },
                cursor: "nwse-resize",
              },
              {
                pos: "ne",
                style: { right: -6, top: -6 },
                cursor: "nesw-resize",
              },
              {
                pos: "sw",
                style: { left: -6, bottom: -6 },
                cursor: "nesw-resize",
              },
              {
                pos: "se",
                style: { right: -6, bottom: -6 },
                cursor: "nwse-resize",
              },
            ].map((corner) => (
              <div
                key={corner.pos}
                onMouseDown={(e) => handleCornerMouseDown(e, corner.pos)}
                className="absolute w-3.5 h-3.5 bg-orange-500 border-2 border-white rounded-full shadow-md hover:bg-orange-600 transition"
                style={{
                  ...corner.style,
                  cursor: corner.cursor,
                  zIndex: 10,
                }}
              />
            ))}

            <div
              className="absolute -top-6 left-0 text-[10px] font-bold bg-orange-500 text-white px-2 py-0.5 rounded shadow"
              style={{ whiteSpace: "nowrap" }}
            >
              Print Area
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 text-xs">
        <div>
          <label className="block text-gray-500 font-semibold mb-1">X</label>
          <input
            type="number"
            value={value.x}
            onChange={(e) => onChange({ ...value, x: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-500 font-semibold mb-1">Y</label>
          <input
            type="number"
            value={value.y}
            onChange={(e) => onChange({ ...value, y: Number(e.target.value) })}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-500 font-semibold mb-1">
            Width
          </label>
          <input
            type="number"
            value={value.width}
            onChange={(e) =>
              onChange({ ...value, width: Number(e.target.value) })
            }
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <div>
          <label className="block text-gray-500 font-semibold mb-1">
            Height
          </label>
          <input
            type="number"
            value={value.height}
            onChange={(e) =>
              onChange({ ...value, height: Number(e.target.value) })
            }
            className="w-full border rounded px-2 py-1"
          />
        </div>
      </div>
    </div>
  );
};

export default PrintAreaSelector;