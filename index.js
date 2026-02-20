/* =========================================
   BASE
========================================= */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Inter", sans-serif;
  background: #ffffff;
  color: #2b6cb0;
}

/* =========================================
   WRAPPER STRUCTURE
========================================= */

.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-area {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 60px;
  position: relative;
  z-index: 2;
}

/* =========================================
   STAGES
========================================= */

.stage {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.hidden {
  display: none;
}

/* =========================================
   TEXT
========================================= */

.subtext {
  font-size: 22px;
  margin: 0;
}

.pink {
  font-size: 28px;
  color: #e85d75;
  margin: 8px 0 16px;
}

.main-question {
  font-family: "Playfair Display", serif;
  font-size: 64px;
  line-height: 1.15;
  margin-bottom: 40px;
}

.red-text {
  font-family: "Playfair Display", serif;
  font-size: 60px;
  color: #b00020;
  text-align: center;
}

/* =========================================
   LAYOUT SIDES
========================================= */

.content-left {
  flex: 1;
}

.content-right {
  flex: 1;
  display: flex;
  justify-content: center;
}

.side-gif {
  width: 420px;
  max-width: 100%;
}

.rounded-gif {
  width: 420px;
  max-width: 100%;
  border-radius: 20px;
}

.final-gif {
  width: 450px;
  max-width: 100%;
}

/* =========================================
   BUTTONS
========================================= */

.button-area {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

button {
  border: none;
  cursor: pointer;
  font-family: "Playfair Display", serif;
  transition: all 0.25s ease;
}

.btn-yes {
  background: #4f83d1;
  color: white;
  font-size: 48px;
  padding: 22px 80px;
  border-radius: 14px;
}

.btn-no {
  background: #e84c4c;
  color: white;
  font-size: 18px;
  padding: 8px 36px;
  border-radius: 8px;
}

.btn-red {
  background: #b00020;
  color: white;
  font-size: 46px;
  padding: 20px 90px;
  border-radius: 16px;
}

/* =========================================
   MEMORY SECTION (NEVER FLOATS)
========================================= */

.memory-section {
  width: 100%;
  text-align: center;
  padding: 40px 0 60px 0;
  position: relative;
  z-index: 2;
}

.memory-anchor {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
}

.mini-stitch {
  width: 36px;
  margin-bottom: 8px;
}

.mini-text {
  font-size: 12px;
  color: #777;
}

/* =========================================
   BLOOD CONTROL
========================================= */

.blood-splash {
  position: fixed;
  pointer-events: none;
  z-index: 1;
}

/* =========================================
   MOBILE
========================================= */

@media (max-width: 900px) {

  .content-area {
    padding: 40px 20px;
  }

  .stage {
    flex-direction: column;
    text-align: center;
    gap: 28px;
  }

  .main-question {
    font-size: 34px;
  }

  .subtext {
    font-size: 16px;
  }

  .pink {
    font-size: 20px;
  }

  .btn-yes {
    font-size: 26px;
    padding: 14px 42px;
  }

  .btn-no {
    font-size: 14px;
    padding: 8px 24px;
  }

  .btn-red {
    font-size: 28px;
    padding: 16px 60px;
  }

  .side-gif,
  .rounded-gif,
  .final-gif {
    width: 220px;
  }

}
