async function runCode() {
  const code = document.getElementById("code").value;
  const outputBox = document.getElementById("output");

  outputBox.innerText = "Running... ⏳";

  try {
    const res = await fetch("/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await res.json();
    outputBox.innerText = data.output || "No Output";
  } catch (error) {
    outputBox.innerText = "Error connecting to server";
  }
}

function clearOutput() {
  document.getElementById("output").innerText = "";
}