"use client"

import { useEffect, useRef } from "react"

export default function HeroSvg() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Update SVG dimensions on window resize
    const updateSize = () => {
      svg.setAttribute("width", window.innerWidth.toString())
      svg.setAttribute("height", window.innerHeight.toString())
    }

    updateSize()
    window.addEventListener("resize", updateSize)

    // Generate animated circuit traces
    const generateTraces = () => {
      const defs = svg.querySelector("defs") || document.createElementNS("http://www.w3.org/2000/svg", "defs")
      if (!svg.querySelector("defs")) svg.appendChild(defs)

      // Create gradient for glow
      const gradientId = "glowGradient"
      let gradient = svg.querySelector(`#${gradientId}`)
      if (!gradient) {
        gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient")
        gradient.setAttribute("id", gradientId)
        gradient.setAttribute("x1", "0%")
        gradient.setAttribute("y1", "0%")
        gradient.setAttribute("x2", "100%")
        gradient.setAttribute("y2", "0%")

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop1.setAttribute("offset", "0%")
        stop1.setAttribute("stop-color", "#00c8ff")
        stop1.setAttribute("stop-opacity", "0")

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop2.setAttribute("offset", "50%")
        stop2.setAttribute("stop-color", "#00c8ff")
        stop2.setAttribute("stop-opacity", "1")

        const stop3 = document.createElementNS("http://www.w3.org/2000/svg", "stop")
        stop3.setAttribute("offset", "100%")
        stop3.setAttribute("stop-color", "#00c8ff")
        stop3.setAttribute("stop-opacity", "0")

        gradient.appendChild(stop1)
        gradient.appendChild(stop2)
        gradient.appendChild(stop3)
        defs.appendChild(gradient)
      }

      // Create circuit traces
      const traces = [
        { x1: 100, y1: 200, x2: 400, y2: 150, delay: 0 },
        { x1: 300, y1: 100, x2: 600, y2: 300, delay: 0.5 },
        { x1: 200, y1: 400, x2: 700, y2: 200, delay: 1 },
        { x1: 500, y1: 150, x2: 800, y2: 400, delay: 1.5 },
        { x1: 50, y1: 500, x2: 450, y2: 400, delay: 2 },
      ]

      traces.forEach((trace, i) => {
        let path = svg.querySelector(`[data-trace="${i}"]`) as SVGPathElement | null
        if (!path) {
          path = document.createElementNS("http://www.w3.org/2000/svg", "path")
          path.setAttribute("data-trace", i.toString())
          path.setAttribute("d", `M ${trace.x1} ${trace.y1} L ${trace.x2} ${trace.y2}`)
          path.setAttribute("stroke", `url(#${gradientId})`)
          path.setAttribute("stroke-width", "2")
          path.setAttribute("fill", "none")
          path.setAttribute("opacity", "0.6")
          path.setAttribute("style", `stroke-dasharray: 500; stroke-dashoffset: 500; animation: trace-draw 3s ease-in-out ${trace.delay}s infinite;`)
          svg.insertBefore(path, svg.querySelector("[data-type='nodes']"))
        }
      })
    }

    generateTraces()

    // Create animated grid
    const createGrid = () => {
      let gridGroup = svg.querySelector("[data-type='grid']") as SVGGElement | null
      if (!gridGroup) {
        gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        gridGroup.setAttribute("data-type", "grid")
        gridGroup.setAttribute("opacity", "0.15")
        gridGroup.setAttribute("style", "animation: grid-pulse 4s ease-in-out infinite;")
        svg.appendChild(gridGroup)

        const spacing = 50
        const width = window.innerWidth
        const height = window.innerHeight

        // Vertical lines
        for (let x = 0; x < width; x += spacing) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", x.toString())
          line.setAttribute("y1", "0")
          line.setAttribute("x2", x.toString())
          line.setAttribute("y2", height.toString())
          line.setAttribute("stroke", "#00c8ff")
          line.setAttribute("stroke-width", "0.5")
          gridGroup.appendChild(line)
        }

        // Horizontal lines
        for (let y = 0; y < height; y += spacing) {
          const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
          line.setAttribute("x1", "0")
          line.setAttribute("y1", y.toString())
          line.setAttribute("x2", width.toString())
          line.setAttribute("y2", y.toString())
          line.setAttribute("stroke", "#00c8ff")
          line.setAttribute("stroke-width", "0.5")
          gridGroup.appendChild(line)
        }
      }
    }

    createGrid()

    // Create pulsing nodes
    const createNodes = () => {
      let nodesGroup = svg.querySelector("[data-type='nodes']") as SVGGElement | null
      if (!nodesGroup) {
        nodesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        nodesGroup.setAttribute("data-type", "nodes")
        svg.appendChild(nodesGroup)

        const nodePositions = [
          { x: 100, y: 200, delay: 0 },
          { x: 400, y: 150, delay: 0.3 },
          { x: 600, y: 300, delay: 0.6 },
          { x: 700, y: 200, delay: 0.9 },
          { x: 300, y: 100, delay: 1.2 },
          { x: 500, y: 400, delay: 1.5 },
          { x: 800, y: 400, delay: 1.8 },
          { x: 450, y: 400, delay: 2.1 },
        ]

        nodePositions.forEach((node) => {
          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", node.x.toString())
          circle.setAttribute("cy", node.y.toString())
          circle.setAttribute("r", "3")
          circle.setAttribute("fill", "#00c8ff")
          circle.setAttribute("opacity", "0.8")
          circle.setAttribute("style", `animation: pulse-node 2s ease-in-out ${node.delay}s infinite;`)
          nodesGroup.appendChild(circle)
        })
      }
    }

    createNodes()

    // Create floating particles
    const createParticles = () => {
      let particlesGroup = svg.querySelector("[data-type='particles']") as SVGGElement | null
      if (!particlesGroup) {
        particlesGroup = document.createElementNS("http://www.w3.org/2000/svg", "g")
        particlesGroup.setAttribute("data-type", "particles")
        svg.appendChild(particlesGroup)

        for (let i = 0; i < 8; i++) {
          const x = Math.random() * window.innerWidth
          const y = window.innerHeight + 50
          const delay = Math.random() * 3
          const duration = 8 + Math.random() * 4

          const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
          circle.setAttribute("cx", x.toString())
          circle.setAttribute("cy", y.toString())
          circle.setAttribute("r", (Math.random() * 1.5 + 0.5).toString())
          circle.setAttribute("fill", "#00c8ff")
          circle.setAttribute("opacity", "0.3")
          circle.setAttribute("style", `animation: float-up ${duration}s ease-in ${delay}s infinite;`)
          particlesGroup.appendChild(circle)
        }
      }
    }

    createParticles()

    // Scan line effect
    const createScanLine = () => {
      let scanLine = svg.querySelector("[data-type='scanline']") as SVGLineElement | null
      if (!scanLine) {
        scanLine = document.createElementNS("http://www.w3.org/2000/svg", "line")
        scanLine.setAttribute("data-type", "scanline")
        scanLine.setAttribute("x1", "0")
        scanLine.setAttribute("y1", "0")
        scanLine.setAttribute("x2", window.innerWidth.toString())
        scanLine.setAttribute("y2", "0")
        scanLine.setAttribute("stroke", "#00c8ff")
        scanLine.setAttribute("stroke-width", "1")
        scanLine.setAttribute("opacity", "0.2")
        scanLine.setAttribute("style", "animation: scan-line 5s linear infinite;")
        svg.appendChild(scanLine)
      }
    }

    createScanLine()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      width={typeof window !== "undefined" ? window.innerWidth : 1024}
      height={typeof window !== "undefined" ? window.innerHeight : 768}
      className="fixed inset-0 pointer-events-none"
      style={{ backgroundColor: "transparent" }}
    />
  )
}
