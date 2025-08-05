import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../componentStyles/MouseFollower.css";

export default function MouseFollower() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;

 
    const xSet = gsap.quickSetter(dot, "x", "px");
    const ySet = gsap.quickSetter(dot, "y", "px");

    let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }; 
    let mouse = { x: pos.x, y: pos.y };

    const moveDot = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", moveDot);

    
    gsap.ticker.add(() => {
      
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;

      xSet(pos.x);
      ySet(pos.y);
    });

    return () => {
      window.removeEventListener("mousemove", moveDot);
      gsap.ticker.remove(() => {}); 
    };
  }, []);

  return <div className="mouse-dot" ref={dotRef}></div>;
}
