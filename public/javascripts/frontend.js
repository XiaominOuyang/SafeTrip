let map;

// Initialize and add the map
function initMap() {
  const center = { lat: 37.404, lng: -121.9357 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: center,
  });

  new google.maps.Marker({
    position: center,
    map: map,
  });
}

let customLabel = {
  Burglary: {
    label: "B"
  },
  Assault: {
    label: "A"
  },
  Murder: {
    label: "M"
  }
};

async function loadReports() {
  try {
    const resRaw = await fetch("/getReports");
    const res = await resRaw.json();

    res.files.forEach(renderReports);
  } catch (e) {
    console.log("error", e);
  }
}

function renderReports(file) {
  const latLng = new google.maps.LatLng(file.lat, file.lng);
  const icon = customLabel[file.event] || {};

  new google.maps.Marker({
    position: latLng,
    map: map,
    label: icon.label
  });
}

loadReports();


