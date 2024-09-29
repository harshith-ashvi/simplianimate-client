// if (canvasRef.current !== null) {
//   const canvas = new fabric.Canvas(canvasRef.current, {
//     width: canvasDimension.width,
//     height: canvasDimension.height,
//     backgroundColor: "white",
//   });

// const rect = new fabric.Rect({
//   left: 50,
//   top: 50,
//   backgroundColor: "red",
//   width: 100,
//   height: 100,
// });

// canvas.add(rect);

// rect.animate(
//   { backgroundColor: "yellow" },
//   {
//     onChange: canvas.renderAll.bind(canvas),
//     duration: 5000,
//     easing: fabric.util.ease.easeInOutQuad,
//     onComplete: () => {
//       console.log("Color change complete, starting movement");
//       // Animate movement to the right
//       rect.animate(
//         { left: 250 },
//         {
//           onChange: canvas.renderAll.bind(canvas),
//           duration: 1000,
//           easing: fabric.util.ease.easeInOutQuad,
//           onComplete: () => {
//             console.log("Movement complete");
//           },
//         }
//       );
//       rect.animate(
//         { top: 200 },
//         {
//           onChange: canvas.renderAll.bind(canvas),
//           duration: 1500,
//           easing: fabric.util.ease.easeInOutQuad,
//           onComplete: () => {
//             console.log("Movement complete");
//           },
//         }
//       );
//       rect.animate(
//         { backgroundColor: "#0000ff" },
//         {
//           onChange: canvas.renderAll.bind(canvas),
//           duration: 1500,
//           easing: fabric.util.ease.easeInOutQuad,
//           onComplete: () => {
//             console.log("Color Change");
//             rect.animate(
//               { width: 100, height: 300, angle: 45, opacity: 0.5 },
//               {
//                 onChange: canvas.renderAll.bind(canvas),
//                 duration: 1500,
//                 easing: fabric.util.ease.easeInQuad,
//                 onComplete: () => {
//                   console.log("Movement complete");
//                 },
//               }
//             );
//           },
//         }
//       );
//     },
//   }
// );

// canvas.renderAll();

// Cleanup on unmount
//   return () => {
//     canvas.dispose();
//   };
// }

// bouncing text
// const text = new fabric.Textbox(formData.text, {
//   left: canvas.width / 2,
//   top: -formData.fontSize,
//   width: canvas.width * 0.8,
//   textAlign: "center",
//   fontSize: formData.fontSize,
//   fill: formData.fontColor,
//   fontFamily: formData.font,
// });

// text.set({ originX: "center", originY: "top" });
// canvas.add(text);

// let velocity = 0;
// const gravity = 0.5;
// const bounce = -0.7;
// const bottomGap = canvas.height * 0.15; // 15% gap at the bottom

// function animate() {
//   velocity += gravity;
//   text.top += velocity;

//   if (text.top + text.height > canvas.height - bottomGap) {
//     text.top = canvas.height - bottomGap - text.height;
//     velocity *= bounce;
//   }

//   canvas.renderAll();
//   fabric.util.requestAnimFrame(animate);
// }

// setTimeout(animate, formData.fallDelay);

// rotating and scaling text
// useEffect(() => {
//   if (canvasRef.current !== null) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const text = new fabric.Textbox(formData.text, {
//       left: canvas.width / 2,
//       top: canvas.height / 2,
//       width: canvas.width * 0.8,
//       textAlign: 'center',
//       fontSize: formData.fontSize,
//       fill: formData.fontColor,
//       fontFamily: formData.font,
//       originX: 'center',
//       originY: 'center',
//     });

//     canvas.add(text);

//     let angle = 0;
//     let scale = 1;

//     function animate() {
//       angle += 2;
//       scale = 1 + Math.sin(angle * Math.PI / 180) * 0.2;

//       text.set({
//         angle: Math.sin(angle * Math.PI / 180) * 10,
//         scaleX: scale,
//         scaleY: scale,
//       });

//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     setTimeout(animate, formData.fallDelay);

//     return () => canvas.dispose();
//   }
// }, [formData, canvasDimension, downloadFile.canDownload]);

// wave text
// useEffect(() => {
//   if (canvasRef.current !== null) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const text = formData.text.split('').map((char, i) =>
//       new fabric.Text(char, {
//         left: (i * formData.fontSize) + canvas.width / 2 - (formData.text.length * formData.fontSize) / 2,
//         top: canvas.height / 2,
//         fontSize: formData.fontSize,
//         fill: formData.fontColor,
//         fontFamily: formData.font,
//       })
//     );

//     canvas.add(...text);

//     function animate() {
//       text.forEach((char, i) => {
//         char.set({
//           top: canvas.height / 2 + Math.sin((Date.now() + i * 100) / 200) * 30
//         });
//       });

//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     setTimeout(animate, formData.fallDelay);

//     return () => canvas.dispose();
//   }
// }, [formData, canvasDimension, downloadFile.canDownload]);

// typewriter text
// useEffect(() => {
//   if (canvasRef.current !== null) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const text = new fabric.Text('', {
//       left: 50,
//       top: canvas.height / 2,
//       fontSize: formData.fontSize,
//       fill: formData.fontColor,
//       fontFamily: formData.font,
//     });

//     canvas.add(text);

//     let index = 0;

//     function animate() {
//       if (index < formData.text.length) {
//         text.set('text', formData.text.slice(0, index + 1));
//         index++;
//         canvas.renderAll();
//         setTimeout(animate, 100);
//       }
//     }

//     setTimeout(animate, formData.fallDelay);

//     return () => canvas.dispose();
//   }
// }, [formData, canvasDimension, downloadFile.canDownload]);

// 3D text
// useEffect(() => {
//   if (canvasRef.current !== null) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const letters = formData.text.split('').map((char, i) =>
//       new fabric.Text(char, {
//         left: canvas.width / 2,
//         top: canvas.height / 2,
//         fontSize: formData.fontSize,
//         fill: formData.fontColor,
//         fontFamily: formData.font,
//         originX: 'center',
//         originY: 'center',
//         angle: i * (360 / formData.text.length),
//       })
//     );

//     canvas.add(...letters);

//     let angle = 0;

//     function animate() {
//       angle += 1;
//       letters.forEach((letter, i) => {
//         const radius = 100;
//         const letterAngle = angle + i * (360 / formData.text.length);
//         letter.set({
//           left: canvas.width / 2 + radius * Math.cos(letterAngle * Math.PI / 180),
//           top: canvas.height / 2 + radius * Math.sin(letterAngle * Math.PI / 180) * 0.3,
//           fontSize: formData.fontSize * (0.8 + 0.4 * Math.sin(letterAngle * Math.PI / 180)),
//           opacity: 0.4 + 0.6 * Math.sin(letterAngle * Math.PI / 180),
//         });
//       });

//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     setTimeout(animate, formData.fallDelay);

//     return () => canvas.dispose();
//   }
// }, [formData, canvasDimension, downloadFile.canDownload]);

// glitch effect
//Simple glitch effect
// const text = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: formData.fontColor,
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const glitchText1 = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'cyan',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center',
//   opacity: 0.8
// });

// const glitchText2 = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'red',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center',
//   opacity: 0.8
// });

// canvas.add(text, glitchText1, glitchText2);

// function animate() {
//   const offset = Math.random() * 10 - 5;
//   glitchText1.set({
//     left: text.left! + offset,
//     top: text.top! + offset
//   });
//   glitchText2.set({
//     left: text.left! - offset,
//     top: text.top! - offset
//   });

//   if (Math.random() > 0.9) {
//     text.set('opacity', Math.random());
//   }

//   canvas.renderAll();
//   fabric.util.requestAnimFrame(animate);
// }

// setTimeout(animate, formData.fallDelay);

// complex glitch effect
// const text = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: formData.fontColor,
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const glitchText1 = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'cyan',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center',
//   opacity: 0.8
// });

// const glitchText2 = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'red',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center',
//   opacity: 0.8
// });

// canvas.add(text, glitchText1, glitchText2);

// function getRandomColor() {
//   return `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
// }

// function animate() {
//   const glitchIntensity = Math.random();

//   if (glitchIntensity > 0.3) {
//     const offsetX = Math.random() * 20 - 10;
//     const offsetY = Math.random() * 20 - 10;

//     glitchText1.set({
//       left: text.left! + offsetX,
//       top: text.top! + offsetY,
//       opacity: Math.random() * 0.9 + 0.1,
//       fill: Math.random() > 0.5 ? 'cyan' : getRandomColor()
//     });

//     glitchText2.set({
//       left: text.left! - offsetX,
//       top: text.top! - offsetY,
//       opacity: Math.random() * 0.9 + 0.1,
//       fill: Math.random() > 0.5 ? 'red' : getRandomColor()
//     });

//     if (glitchIntensity > 0.8) {
//       text.set({
//         skewX: Math.random() * 10 - 5,
//         skewY: Math.random() * 10 - 5,
//         opacity: Math.random() * 0.5 + 0.5
//       });
//     } else {
//       text.set({
//         skewX: 0,
//         skewY: 0,
//         opacity: 1
//       });
//     }

//     if (Math.random() > 0.9) {
//       const splitPosition = Math.floor(formData.text.length / 2);
//       text.set('text', formData.text.slice(0, splitPosition));
//       glitchText1.set('text', formData.text.slice(splitPosition));
//       glitchText2.set('text', '');
//     } else {
//       text.set('text', formData.text);
//       glitchText1.set('text', formData.text);
//       glitchText2.set('text', formData.text);
//     }

//     canvas.renderAll();
//   }

//   fabric.util.requestAnimFrame(animate);
// }

// setTimeout(animate, formData.fallDelay);

//RGB Split Glitch
// const text = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: formData.fontColor,
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const redText = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'red',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const greenText = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'green',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const blueText = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: 'blue',
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// canvas.add(redText, greenText, blueText);

// function animate() {
//   if (Math.random() > 0.7) {
//     const offsetX = Math.random() * 10 - 5;
//     const offsetY = Math.random() * 10 - 5;

//     redText.set({
//       left: canvas.width / 2 + offsetX,
//       top: canvas.height / 2 + offsetY
//     });

//     greenText.set({
//       left: canvas.width / 2 - offsetX,
//       top: canvas.height / 2 - offsetY
//     });

//     blueText.set({
//       left: canvas.width / 2 + offsetY,
//       top: canvas.height / 2 - offsetX
//     });
//   } else {
//     redText.set({ left: canvas.width / 2, top: canvas.height / 2 });
//     greenText.set({ left: canvas.width / 2, top: canvas.height / 2 });
//     blueText.set({ left: canvas.width / 2, top: canvas.height / 2 });
//   }

//   canvas.renderAll();
//   fabric.util.requestAnimFrame(animate);
// }

// setTimeout(animate, formData.fallDelay);

//Scanline Glitch
// const text = new fabric.Text(formData.text, {
//   left: canvas.width / 2,
//   top: canvas.height / 2,
//   fontSize: formData.fontSize,
//   fill: formData.fontColor,
//   fontFamily: formData.font,
//   originX: 'center',
//   originY: 'center'
// });

// const scanlines = new fabric.Rect({
//   left: 0,
//   top: 0,
//   width: canvas.width,
//   height: canvas.height,
//   fill: 'rgba(0,0,0,0.1)',
//   opacity: 0.5
// });

// canvas.add(text, scanlines);

// let scanlineOffset = 0;

// function animate() {
//   scanlineOffset += 2;
//   if (scanlineOffset > canvas.height) scanlineOffset = 0;

//   scanlines.set({
//     'top': scanlineOffset,
//     'clipTo': function(ctx) {
//       ctx.rect(0, -scanlineOffset, canvas.width, canvas.height / 2);
//     }
//   });

//   if (Math.random() > 0.95) {
//     text.set({
//       left: canvas.width / 2 + (Math.random() * 20 - 10),
//       skewX: Math.random() * 10 - 5
//     });
//   }

//   canvas.renderAll();
//   fabric.util.requestAnimFrame(animate);
// }

// setTimeout(animate, formData.fallDelay);

// pattern effect

// useEffect(() => {
//   if (canvasRef.current) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const gridSize = 8;
//     const squareSize = Math.min(canvas.width!, canvas.height!) / gridSize;
//     const shapes: fabric.Object[] = [];

//     // Create grid of shapes
//     for (let x = 0; x < gridSize; x++) {
//       for (let y = 0; y < gridSize; y++) {
//         const shape = new fabric.Circle({
//           left: x * squareSize + squareSize / 2,
//           top: y * squareSize + squareSize / 2,
//           radius: squareSize * 0.4,
//           fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
//           originX: 'center',
//           originY: 'center'
//         });
//         shapes.push(shape);
//         canvas.add(shape);
//       }
//     }

//     let time = 0;
//     function animate() {
//       time += 0.02;
//       shapes.forEach((shape, index) => {
//         const x = index % gridSize;
//         const y = Math.floor(index / gridSize);
//         const distanceFromCenter = Math.sqrt(
//           Math.pow(x - gridSize / 2 + 0.5, 2) +
//           Math.pow(y - gridSize / 2 + 0.5, 2)
//         );

//         shape.set({
//           scaleX: 0.5 + Math.abs(Math.sin(time + distanceFromCenter)) * 0.5,
//           scaleY: 0.5 + Math.abs(Math.sin(time + distanceFromCenter)) * 0.5,
//           fill: `hsl(${(time * 50 + distanceFromCenter * 50) % 360}, 70%, 50%)`
//         });
//       });

//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     animate();

//     return () => {
//       canvas.dispose();
//     };
//   }
// }, [canvasDimension, formData]);

// Spiral lines effect
// useEffect(() => {
//   if (canvasRef.current) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const centerX = canvas.width! / 2;
//     const centerY = canvas.height! / 2;
//     const lines: fabric.Line[] = [];

//     for (let i = 0; i < 200; i++) {
//       const angle = i * 0.1;
//       const radius = i * 0.5;
//       const x = centerX + Math.cos(angle) * radius;
//       const y = centerY + Math.sin(angle) * radius;

//       const line = new fabric.Line([centerX, centerY, x, y], {
//         stroke: `hsl(${i * 1.8}, 100%, 50%)`,
//         strokeWidth: 2,
//         selectable: false
//       });
//       lines.push(line);
//       canvas.add(line);
//     }

//     function animate() {
//       lines.forEach((line, i) => {
//         const angle = (Date.now() * 0.001 + i * 0.1) % (Math.PI * 2);
//         const radius = i * 0.5;
//         const x = centerX + Math.cos(angle) * radius;
//         const y = centerY + Math.sin(angle) * radius;
//         line.set({ 'x2': x, 'y2': y });
//       });
//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     animate();

//     return () => {
//       canvas.dispose();
//     };
//   }
// }, [canvasDimension, formData]);

// Geometric Shapes Mosaic
// useEffect(() => {
//   if (canvasRef.current) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const shapes: fabric.Object[] = [];
//     const gridSize = 10;
//     const cellSize = Math.min(canvas.width!, canvas.height!) / gridSize;

//     for (let x = 0; x < gridSize; x++) {
//       for (let y = 0; y < gridSize; y++) {
//         let shape;
//         const randomShape = Math.floor(Math.random() * 3);
//         switch (randomShape) {
//           case 0:
//             shape = new fabric.Rect({
//               width: cellSize * 0.8,
//               height: cellSize * 0.8,
//             });
//             break;
//           case 1:
//             shape = new fabric.Circle({
//               radius: cellSize * 0.4,
//             });
//             break;
//           case 2:
//             shape = new fabric.Triangle({
//               width: cellSize * 0.8,
//               height: cellSize * 0.8,
//             });
//             break;
//         }
//         shape.set({
//           left: x * cellSize + cellSize / 2,
//           top: y * cellSize + cellSize / 2,
//           fill: `hsl(${Math.random() * 360}, 70%, 50%)`,
//           originX: 'center',
//           originY: 'center',
//           selectable: false
//         });
//         shapes.push(shape);
//         canvas.add(shape);
//       }
//     }

//     function animate() {
//       const time = Date.now() * 0.001;
//       shapes.forEach((shape, i) => {
//         const x = i % gridSize;
//         const y = Math.floor(i / gridSize);
//         const distanceFromCenter = Math.sqrt(
//           Math.pow(x - gridSize / 2 + 0.5, 2) +
//           Math.pow(y - gridSize / 2 + 0.5, 2)
//         );
//         shape.set({
//           scaleX: 0.5 + Math.abs(Math.sin(time + distanceFromCenter)) * 0.5,
//           scaleY: 0.5 + Math.abs(Math.sin(time + distanceFromCenter)) * 0.5,
//           angle: Math.sin(time + distanceFromCenter) * 180,
//           fill: `hsl(${(time * 50 + distanceFromCenter * 50) % 360}, 70%, 50%)`
//         });
//       });
//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     animate();

//     return () => {
//       canvas.dispose();
//     };
//   }
// }, [canvasDimension, formData]);

// Abstract background effect
// useEffect(() => {
//   if (canvasRef.current) {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: canvasDimension.width,
//       height: canvasDimension.height,
//       backgroundColor: formData.backgroundColor,
//     });

//     const numShapes = 15;
//     const shapes: fabric.Object[] = [];

//     // Create abstract shapes
//     for (let i = 0; i < numShapes; i++) {
//       const points = [];
//       const numPoints = Math.floor(Math.random() * 5) + 3;
//       for (let j = 0; j < numPoints; j++) {
//         points.push({
//           x: Math.random() * canvas.width!,
//           y: Math.random() * canvas.height!
//         });
//       }

//       const shape = new fabric.Polygon(points, {
//         fill: `hsla(${Math.random() * 360}, 70%, 50%, 0.5)`,
//         stroke: 'rgba(255, 255, 255, 0.5)',
//         strokeWidth: 2,
//         selectable: false,
//         objectCaching: false,
//       });
//       shapes.push(shape);
//       canvas.add(shape);
//     }

//     // Create a radial gradient overlay
//     const gradientOverlay = new fabric.Circle({
//       left: canvas.width! / 2,
//       top: canvas.height! / 2,
//       radius: Math.max(canvas.width!, canvas.height!) / 2,
//       selectable: false,
//       objectCaching: false,
//     });
//     canvas.add(gradientOverlay);

//     function animate() {
//       const time = Date.now() * 0.001;

//       // Animate shapes
//       shapes.forEach((shape, index) => {
//         const points = shape.get('points') as fabric.Point[];
//         const newPoints = points.map((point, i) => {
//           const noiseX = Math.sin(time * 0.5 + index + i * 0.5) * 20;
//           const noiseY = Math.cos(time * 0.5 + index + i * 0.5) * 20;
//           return new fabric.Point(point.x + noiseX, point.y + noiseY);
//         });
//         shape.set('points', newPoints);

//         // Slowly change shape colors
//         const hue = (time * 10 + index * 30) % 360;
//         shape.set('fill', `hsla(${hue}, 70%, 50%, 0.5)`);
//       });

//       // Animate radial gradient
//       const gradient = new fabric.Gradient({
//         type: 'radial',
//         coords: {
//           r1: Math.max(canvas.width!, canvas.height!) * (0.3 + Math.sin(time * 0.5) * 0.1),
//           r2: Math.max(canvas.width!, canvas.height!) * (0.6 + Math.sin(time * 0.5) * 0.1),
//           x1: canvas.width! / 2,
//           y1: canvas.height! / 2,
//           x2: canvas.width! / 2,
//           y2: canvas.height! / 2,
//         },
//         colorStops: [
//           { offset: 0, color: 'rgba(0, 0, 0, 0)' },
//           { offset: 1, color: `hsla(${time * 20 % 360}, 70%, 30%, 0.5)` },
//         ],
//       });
//       gradientOverlay.set('fill', gradient);

//       canvas.renderAll();
//       fabric.util.requestAnimFrame(animate);
//     }

//     animate();

//     return () => {
//       canvas.dispose();
//     };
//   }
// }, [canvasDimension, formData]);
