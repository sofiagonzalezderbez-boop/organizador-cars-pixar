document.getElementById("addEvent").addEventListener("click", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value || "Evento sin nombre";
  const dateInput = document.getElementById("date").value;
  const urgency = document.getElementById("urgency").value;

  if (!dateInput) {
    alert("⚡ ¡Ey, piloto! No puedes arrancar sin una fecha. Marca tu carrera 🏁");
    return;
  }

  let urgenciaTexto = "";
  switch (urgency) {
    case "baja": urgenciaTexto = "🚗 Urgencia baja"; break;
    case "media": urgenciaTexto = "🏎️ Urgencia media"; break;
    case "alta": urgenciaTexto = "🔥 URGENCIA ALTA (a todo gas)"; break;
  }

  const startDate = new Date(dateInput + "T00:00:00");
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

  const formatDate = (d) => d.toISOString().replace(/-|:|\.\d+/g, "");

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Calendario del Campeón//MX
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${urgenciaTexto} - ¡Ka-chow! Tu carrera está lista 🏎️💨
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${title}.ics`;
  link.click();

  const btn = document.querySelector(".turbo-btn");
  btn.style.transform = "scale(1.1)";
  setTimeout(() => (btn.style.transform = "scale(1)"), 200);
});