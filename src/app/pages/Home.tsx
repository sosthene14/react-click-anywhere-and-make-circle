import { useEffect, useState } from "react";

interface ClickEvent {
  target: {
    id: string;
  };
}

interface IPosition {
  x: number;
  y: number;
}

export const Home = () => {
  const [positions, setPositions] = useState<IPosition[]>([]);
  const [removedPositions, setRemovedPositions] = useState<IPosition[]>([]);

  const handleClick = (e: MouseEvent) => {
    if ((e as unknown as ClickEvent)?.target?.id !== "boule") {
      const x = e.clientX - 8; 
      const y = e.clientY - 5;
      setPositions((prevPositions) => [...prevPositions, { x, y }]);
      setRemovedPositions([]);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);

    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  const removeItem = () => {
    if (positions.length > 0) {
      const newPositions = [...positions];
      const lastPosition = newPositions.pop();

      if (lastPosition !== undefined) {
        setRemovedPositions((prev) => [...prev, lastPosition]);
        setPositions(newPositions);
      }
    }
  };

  const redo = () => {
    if (removedPositions.length > 0) {
      const newRemovedPositions = [...removedPositions];
      const lastRemoved = newRemovedPositions.pop();

      if (lastRemoved !== undefined) {
        setPositions((prev) => [...prev, lastRemoved]);
        setRemovedPositions(newRemovedPositions);
      }
    }
  };

  return (
    <div id="boule" className="text-white flex gap-2 pt-5">
      <button
       id="boule"
        onClick={removeItem}
        className="bg-slate-600 hover:bg-slate-700 p-2 rounded-md"
      >
        Remove Last
      </button>
      <button
       id="boule"
        onClick={redo}
        className="bg-slate-600 hover:bg-slate-700 p-2 rounded-md"
      >
        Redo Last
      </button>

      <div>
        {positions.map((position, index) => (
          <div
            key={index}
            id="boule"
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
            }}
            className="bg-white rounded-full w-5 h-5"
          ></div>
        ))}
      </div>
    </div>
  );
};
