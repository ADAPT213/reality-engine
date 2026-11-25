# REALITY//ENGINE engineering mandate
Do not describe unexecuted code as verified. Preserve existing public entry point until candidate passes browser tests. Build candidate under /studio/. Do not substitute mockups or static artwork for runtime evidence.

## Architecture
Use WebGL2 multipass rendering with capability detection, ping-pong textures, explicit resource lifecycle and context recovery. Use half-float render targets when supported; provide RGBA8 fallback. Separate raw previous camera frame from rendered temporal history. Implement motion estimation, velocity advection, divergence, pressure Jacobi iterations, gradient subtraction, dye advection, vorticity confinement, dissipation, bloom downsample/upsample and tone mapping. Use bounded simulation resolution and adaptive quality. No per-frame GPU allocation.
Use pinned MediaPipe Tasks Vision hand, pose and person segmentation models with explicit loading/error states and locally hosted assets where license permits. Keep dependency-free effects operational when models fail. Do not claim motion masks are person segmentation. Run inference at bounded frequency, preferably worker where supported. Map landmarks through exact crop/mirror transforms. Use confidence gating and smoothing. No audio or camera uploads.

## Visual deliverables
- Plasma: layered turbulent filaments, emissive core, blue/gold bloom, movement-driven dye injection.
- Gravity: particle advection and attraction/repulsion, lens distortion, touch and tracked-hand control.
- Smoke: velocity-driven advected density, soft turbulent shading, 1.5-second adjustable decay, no static orb.
- Light: persistent luminous ribbons from motion and hand paths, temporal feedback.
- Lightning: branching multi-scale bolts with tapered cores, glow, gesture activation, reduced-motion alternative.
- Phantom: person segmentation mask, silhouette interior particles, temporal echoes, no skeletal stick figure.
- Neon and ink: full-resolution camera edge filters.
- Studio: editable effect parameters, input mappings, scene JSON import/export and local presets.
Full-screen real camera, transparent minimal controls, front/rear switching, touch/keyboard fallback, sensitivity, privacy background toggle, reduced motion, no audio. No mandatory sign-in. Offline after assets cached where supported.

## Release gates
Add Playwright Chromium tests with synthetic video via fake camera device, test permission denial, camera lifecycle, every mode, mode changes, resizing, context loss, model failure, no external frame transmission, and sustained 120-second run. Capture actual screenshots per mode and compare against reviewed visual targets. Test shader compilation and framebuffer completeness. Measure frame timing and resource counts. Publish exact logs, screenshots, browser versions and limitations. Desktop synthetic camera tests do not establish Android/iOS performance or accessibility. Require actual mobile validation before claiming those. Do not promote candidate if tests fail or remain unexecuted. No fabricated results, no placeholder effects, no claims of matching reference artwork without visual review.
