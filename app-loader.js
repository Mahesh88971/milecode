const appScript = "./assets/index-CRBojWpI.js";
const routePattern = 'path:"/",component:fg';
const projectRoute = 'path:"*",component:fg';

async function startApp() {
  const response = await fetch(appScript);
  if (!response.ok) {
    throw new Error(`Could not load the site bundle (${response.status}).`);
  }

  let source = await response.text();
  if (!source.includes(routePattern)) {
    throw new Error("Could not apply the GitHub Pages route adjustment.");
  }

  source = source
    .replace(routePattern, projectRoute)
    .replaceAll('"/images/', '"./images/')
    .replaceAll("'/images/", "'./images/");

  const moduleUrl = URL.createObjectURL(
    new Blob([source], { type: "text/javascript" }),
  );

  try {
    await import(moduleUrl);
  } finally {
    URL.revokeObjectURL(moduleUrl);
  }
}

startApp().catch((error) => {
  console.error(error);
  document.body.classList.add("app-load-error");
});
