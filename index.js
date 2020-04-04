// ==UserScript==
// @name         Amazon Fresh Watcher
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Monitors for Amazon Fresh delivery times.
// @author       Everett Morgan
// @match        https://www.amazon.com/gp/buy/shipoptionselect/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  var interval;
  var count = 0;

  window.onload = () => {
    monitor();
    ui();
  }

  function storage(action, key, value) {
    switch (action) {
      case "get":
        return localStorage.getItem(key);
        break;
      case "set":
        return localStorage.setItem(key, value);
        break;
      default:
        console.error(`Invalid action passed: ${ arguments[0] }`)
    }
  }

  function ui() {
    try {
      let el = document.createElement("div");
      el.style.cssText = "border-radius: 5px; position: fixed; bottom: 15px; left : 15px; z-index: 100;";

      let button = document.createElement("a");
      button.href = "#";

      let emoji = document.createElement("h1");
      emoji.style.cssText = "font-size: 50px;";
      emoji.innerHTML = storage("get", "amz_watcher_mode") == 0 ? "&#128374" : "&#128064";

      emoji.addEventListener("click", (e) => {
        let val = storage("get", "amz_watcher_mode");

        console.log(val);
        console.log(e.target);

        switch (val) {
          case null:
          case "0":
            storage("set", "amz_watcher_mode", 1);
            e.target.innerHTML = "&#128064"
            monitor();
            break;
          case "1":
            clearInterval(interval);
            storage("set", "amz_watcher_mode", 0);
            e.target.innerHTML = "&#128374";
            break;
          default:
            break;

        }
      });

      el.appendChild(button);
      button.appendChild(emoji);
      document.body.appendChild(el);
    } catch (e) {
      console.error(e);
    }
  }

  function monitor() {
    let mode = storage("get", "amz_watcher_mode");

    if (mode === false || mode == 0){
      return;
    }

    var days = document.querySelectorAll("ul .ss-carousel-items li");

    interval = setInterval(() => {
      let msg = document.querySelectorAll("#slot-container-UNATTENDED .a-size-base-plus")[count];
      let regex = /No\sdoorstep\sdelivery\swindows\sare\savailable\sfor\s[A-Za-z]+\,?\s[A-Za-z]+\s[0-9]+\.?/gi;

      days[count].querySelector(".dateButtonCX2").click();
      count++;

      if (regex.test(msg.innerText) === false) {
        alert("Times are available!");
        clearInterval(interval);
        return;
      }

      if (count === 4) {
        window.location.reload();
      }

    }, 1000)
  }

  })();