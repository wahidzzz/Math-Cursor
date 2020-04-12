const lastX = document.getElementById("lastX");
const lastY = document.getElementById("lastY");

const xpos = document.getElementById("xpos");
const ypos = document.getElementById("ypos");

const currentSign = document.getElementById("currentSign");
const equaAns = document.getElementById("equaAns");
const points = document.querySelector(".points");
const ansSkip = document.querySelector(".ansSkip");

const optionSign = document.querySelectorAll("div.sign");

var popupModal = document.getElementById("popupModal");
var popCall = document.getElementById("btn");
var span = document.getElementsByClassName("end")[0];

var x, y, eventDoc, doc, body, equaX, equaY, equaSigns, equaSign;

const maxX = window.screen.availWidth - (window.outerWidth - window.innerWidth);
const maxY =
  window.screen.availHeight - (window.outerHeight - window.innerHeight);

var MAX_POINTS = 10;
var CURRENT_POINTS = 0;
window.onload = getNewAnswer();
//popup
var userCalledPop,
  userCalledClose = false;
popCall.onclick = function () {
  popupModal.style.display = "block";
  userCalledPop = true;
};
span.onclick = function () {
  popupModal.style.display = "none";
  userCalledClose = true;
};
window.onclick = function (event) {
  if (event.target == popupModal) {
    popupModal.style.display = "none";
  }
};

//Skip to New Question
var ansSkipCalled = false;
ansSkip.addEventListener("click", (event) => {
  equaAns.classList.add("strike");
  setTimeout(() => {
    equaAns.classList.remove("strike");
  }, 1000);
  ansSkipCalled = true;
});

//Generate New Answer
function getNewAnswer() {
  equaX = Math.floor(Math.random() * Math.floor(maxX));
  equaY = Math.floor(Math.random() * Math.floor(maxY));
  equaSigns = ["+", "-", "*", "/"];
  equaSign = getUserSelectedSign();
  if (equaSign == undefined || equaSign == "all") {
    equaSign =
      equaSigns[Math.floor(Math.random() * Math.floor(equaSigns.length - 1))];
    if (equaSign == "+") {
      currentSign.innerHTML = "addition";
    } else if (equaSign == "-") {
      currentSign.innerHTML = "subtraction";
    } else if (equaSign == "*") {
      currentSign.innerHTML = "multiplication";
    } else if (equaSign == "/") {
      currentSign.innerHTML = "division";
    }
  }
  equaAns.innerHTML =
    equaSign == "/"
      ? eval(`${equaX}${equaSign}${equaY}`).toFixed(4)
      : eval(`${equaX}${equaSign}${equaY}`);
}

//getUserSign
var userSelectedSign = false;
function getUserSelectedSign() {
  optionSign.forEach((element) => {
    element.addEventListener("click", (event) => {
      currentSign.innerHTML = element.classList[1];
      equaSign = element.dataset.value;
      removeActiveClass();
      element.classList.add("active");
      userSelectedSign = true;
    });
  });
  return equaSign;
}

function removeActiveClass() {
  optionSign.forEach((element) => {
    element.classList.remove("active");
  });
}

//Click Listener
document.addEventListener("click", (event) => {
  equaEval();
});

// Function checker
function equaEval() {
  x = event.clientX;
  y = event.clientY;
  lastX.innerHTML = x;
  lastY.innerHTML = y;
  if (ansSkipCalled) {
    setTimeout(() => {
      getNewAnswer();
      lastX.innerHTML = "";
      lastY.innerHTML = "";
      ansSkipCalled = false;
    }, 1500);
  } else if (userSelectedSign) {
    equaAns.innerHTML = equaSign;
    lastX.innerHTML = "";
    lastY.innerHTML = "";
    setTimeout(() => {
      getNewAnswer();
      userSelectedSign = false;
    }, 1500);
  } else if (userCalledPop || userCalledClose) {
    lastX.innerHTML = "";
    lastY.innerHTML = "";
    setTimeout(() => {
      getNewAnswer();
      userCalledPop = false;
      userCalledClose = false;
    }, 1500);
  } else if (
    eval(`${equaX}${equaSign}${equaY}`) == eval(`${x}${equaSign}${y}`)
  ) {
    equaAns.innerHTML = "correct";
    equaAns.style.color = "#5cb85c";
    setTimeout(() => {
      getNewAnswer();
      points.innerHTML = CURRENT_POINTS += MAX_POINTS;
      lastX.innerHTML = "";
      lastY.innerHTML = "";
      equaAns.style.color = "white";
    }, 1500);
  } else {
    equaAns.innerHTML = "incorrect";
    equaAns.style.color = "#d9534f";
    setTimeout(() => {
      getNewAnswer();
      lastX.innerHTML = "";
      lastY.innerHTML = "";
      equaAns.style.color = "white";
    }, 1500);
  }
}

//Mouse Drag Calculating
(function () {
  document.onmousemove = handleMouseMove;
  function handleMouseMove(event) {
    event = event || window.event;
    if (event.pageX == null && event.clientX != null) {
      eventDoc = (event.target && event.target.ownerDocument) || document;
      doc = eventDoc.documentElement;
      body = eventDoc.body;

      event.pageX =
        event.clientX +
        ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
        ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
      event.pageY =
        event.clientY +
        ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
        ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }
    xpos.innerHTML = event.pageX;
    ypos.innerHTML = event.pageY;
  }
})();
