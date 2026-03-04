import { useEffect, useRef } from 'react';

export function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader - fluid/ripple effect
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform vec2 mouse;
      uniform float time;
      uniform vec2 velocity;

      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                           -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                        + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                               dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 mouseNorm = mouse / resolution;
        
        // Distance from mouse
        float dist = distance(uv, mouseNorm);
        
        // Ripple effect from mouse
        float ripple = sin(dist * 30.0 - time * 3.0) * exp(-dist * 4.0);
        ripple *= smoothstep(0.5, 0.0, dist);
        
        // Add velocity-based distortion
        float velStrength = length(velocity) * 0.5;
        vec2 velDir = normalize(velocity + vec2(0.001));
        float velDist = distance(uv, mouseNorm + velDir * 0.1);
        float velRipple = sin(velDist * 20.0 - time * 2.0) * exp(-velDist * 3.0) * velStrength;
        
        // Base gradient colors (purple/indigo theme)
        vec3 color1 = vec3(0.486, 0.227, 0.929); // Violet #7C3AED
        vec3 color2 = vec3(0.310, 0.275, 0.898); // Indigo #4F46E5
        vec3 color3 = vec3(0.043, 0.043, 0.063); // Dark #0B0B10
        
        // Create flowing background
        float noise1 = snoise(uv * 2.0 + time * 0.1);
        float noise2 = snoise(uv * 3.0 - time * 0.15);
        
        // Mix colors based on noise and position
        float gradientPos = uv.y + noise1 * 0.2 + ripple * 0.1 + velRipple * 0.1;
        vec3 baseColor = mix(color3, mix(color2, color1, gradientPos), 0.4 + noise2 * 0.2);
        
        // Add subtle glow near mouse
        float glow = exp(-dist * 2.0) * 0.15;
        baseColor += vec3(glow * 0.3, glow * 0.2, glow * 0.5);
        
        // Add ripple color
        baseColor += vec3(ripple * 0.05 + velRipple * 0.03);
        
        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Create buffer
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    // Get attribute/uniform locations
    const positionLoc = gl.getAttribLocation(program, 'position');
    const resolutionLoc = gl.getUniformLocation(program, 'resolution');
    const mouseLoc = gl.getUniformLocation(program, 'mouse');
    const timeLoc = gl.getUniformLocation(program, 'time');
    const velocityLoc = gl.getUniformLocation(program, 'velocity');

    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = canvas.height - e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let startTime = Date.now();
    const animate = () => {
      const time = (Date.now() - startTime) / 1000;
      
      // Calculate velocity
      const velocityX = (mouseRef.current.x - mouseRef.current.prevX) * 0.5;
      const velocityY = (mouseRef.current.y - mouseRef.current.prevY) * 0.5;
      
      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform2f(mouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(timeLoc, time);
      gl.uniform2f(velocityLoc, velocityX, velocityY);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
