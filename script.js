
  //Hamburger menu 

  function toggleMenu() {

    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
    
    }
    
    
    
    
    
        gsap.to(".clipper-left", 2, {
          delay: 2,
          clipPath: "inset(0 100% 0 0)",
          ease: "power4.inOut",
          scrub : 4,
        });
    
        gsap.to(".clipper-right", 2, {
          delay: 2,
          clipPath: "inset(0 0 0 100%)",
          ease: "power4.inOut",
          scrub : 4,

        });
    
        gsap.from(".loader-wrapper", 2, {
          scale: 0.9,
          ease: "power1.inOut",
        });
    
        gsap.from(".loader", 2.5, {
          top: "100%",
          ease: "power3.inOut",
        });
    
        gsap.to(
          ".loader-wrapper, .pre-loader",
          0.2,
          {
            opacity: 0,
            display: "none",
            ease: "power3.inOut",
            delay: 2.1,
          },
          "-=1"
        );
    
    
        gsap.from(" nav, .container-text, nav, .image-home, .hamburger-icon, .logo, #threejs-container", 1, {
          opacity: 0,
          delay: 3,
          x: 40,
          ease: "power4.inOut",
          stagger: {
            amount: 0.5,
          },
        });
    
        
     gsap.to(".logo", {
            y: "10%",
            scale: 1.2,
            ease: "none",
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "100vh top",
              scrub: 2,
            },
          });
    
    
          gsap.to(".image-home img", {
            x:"-20%",
            scale: 1,
            rotate:0,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-home",
              start: "top top",
              end: "100vh top",
              scrub: 5,
            },
          });
    
    
    
          gsap.to(".image-home p", {
            x:"20%",
            scale: 1,
            rotate:0,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-home",
              start: "top top",
              end: "100vh top",
              scrub: 5,
            },
          });
    
          gsap.to(".scroll-container p", {
            y: "50%",
            x:"20%",
            scale: 1,
            rotate:0,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-home",
              start: "top top",
              end: "100vh top",
              scrub: 5,
            },
          }); 
    
    
    
    
    
          gsap.to(".scroll-container img", {
           
            scale: 1,
            rotate:0,
            ease: "none",
            scrollTrigger: {
              trigger: ".image-home",
              start: "top top",
              end: "100vh top",
              scrub: 5,
            },
          }); 
    
    
    
        
    const container = document.getElementById('threejs-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('assets/674EFE16-CA84-469E-AD72-F4201AA09BE0_1_105_c.jpeg');
    
    const geometry = new THREE.PlaneGeometry( 3,3, 150, 150,);
    
    

    const material = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 200.0 },
            uTexture: { value: texture },
            uAmplitude: { value: 0.0 }
        },
        vertexShader: `
            uniform float uTime;
            uniform float uAmplitude;
            varying vec2 vUv;
            void main() {
                vUv = uv;
                vec3 pos = position;
                pos.z += sin(pos.x * 3.0 + uTime) * uAmplitude;
                pos.z += sin(pos.y * 8.0 + uTime) * uAmplitude;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D uTexture;
            varying vec2 vUv;
            void main() {
                vec4 color = texture2D(uTexture, vUv);
                gl_FragColor = color;
            }
        `,
        side: THREE.DoubleSide,
        transparent: true
    });
    
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    camera.position.z = 10;
    
    // Raycaster pour détecter le survol précis
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isHovered = false;
    let targetAmplitude = 0.10;
    let currentAmplitude = 0.0;
    
    // Variables pour l'effet de scroll
    let targetCameraZ = 4; // Position initiale de la caméra
    let scrollProgress = 10;
    
    function animate() {
        // Animation de l'effet de hover
        currentAmplitude += (targetAmplitude - currentAmplitude) * 0.03;
        material.uniforms.uAmplitude.value = currentAmplitude;
    
        // Mise à jour de l'effet de scroll
        camera.position.z += (targetCameraZ - camera.position.z) * 0.05;
    
        material.uniforms.uTime.value += 0.050;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Détection du survol précis sur la texture
    container.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);
    
        if (intersects.length > 0) {
            if (!isHovered) {
                isHovered = true;
                targetAmplitude = 0.50;
            }
        } else {
            if (isHovered) {
                isHovered = false;
                targetAmplitude = 0.05;
            }
        }
    });
    
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
    
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    