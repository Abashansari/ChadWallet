const { create } = require('zustand');
const { persist } = require('zustand/middleware');

try {
  const useStore = create()(persist((set) => ({ count: 0 }), { name: 'test' }));
  console.log("Zustand create()() worked!", typeof useStore);
} catch (e) {
  console.log("Zustand create()() FAILED:", e.message);
}

try {
  const useStore2 = create(persist((set) => ({ count: 0 }), { name: 'test2' }));
  console.log("Zustand create(...) worked!", typeof useStore2);
} catch (e) {
  console.log("Zustand create(...) FAILED:", e.message);
}
