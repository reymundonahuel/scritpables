const url = `https://discordstatus.com/api/v2/status.json`;


const req = new Request(url);
req.method = "GET";

const res = await req.loadJSON();
const success = res.status.indicator;
const serverTime = res.page.updated_at;
let valor = "";
const valorRound = valor.slice(0 - 3);
const fecha = res.fecha;
const i = new Request(
  "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0b52aa9e99b832574a53_full_logo_blurple_RGB.png"
);
const img = await i.loadImage();
const timeFormatter = new DateFormatter();
timeFormatter.dateFormat = "dd/MM/yyyy HH:mm";

if (res.status.indicator == "none") {
  valor = "Funcionando";
} else valor = "Parcialmente Caido";

let widget = createWidget(valor, fecha, img);
if (config.runsInWidget) {
  // create and show widget
  Script.setWidget(widget);
  Script.complete();
} else {
  widget.presentSmall();
}

// Assemble widget layout
function createWidget(valor, fecha, img) {
  let w = new ListWidget();
  w.backgroundColor = new Color("#fff");
  w.url = "https://discordstatus.com/";

  let image = w.addImage(img);
  image.imageSize = new Size(75, 75);
  image.centerAlignImage();

  w.addSpacer(8);

  let staticText = w.addText("Estado:");
  staticText.textColor = Color.black();
  staticText.font = Font.boldSystemFont(12);
  staticText.centerAlignText();

  w.addSpacer(8);

  let valorTxt = w.addText(valor);
  valorTxt.textColor = Color.black();
  valorTxt.font = Font.systemFont(18);
  valorTxt.centerAlignText();

  w.addSpacer(8);

  // Show last Update of dolar blue
  let lastDate = w.addText(serverTime ? serverTime : "N/A");
  lastDate.textColor = Color.black();
  lastDate.font = Font.mediumSystemFont(10);
  lastDate.centerAlignText();

  w.setPadding(0, 0, 0, 0);
  return w;
}
