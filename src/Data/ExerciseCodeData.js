export const ExerciseCodeArray = [
    {
        date: 'Mon Oct 18th',
        solution: {
            HTML: `<div class="loaders">
  <div class="loader circle-loader-1"></div>
  <div class="loader circle-loader-2"></div>
  <div class="loader square-loader"></div>
  <div class="loader google-loader">
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
  </div>
</div>`,
            CSS: `html, body {
  background-color: #182935;
  width: 100%;
  height: 100%;
  margin: 0px;
}

.loaders {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
}

.loader {
  min-width: 100px;
}

/* circle loaders */

.circle-loader-1 {
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  border-top: 10px solid rgba(255, 255, 255, 0.2);
  border-right: 10px solid rgba(255, 255, 255, 0.2);
  border-bottom: 10px solid rgba(255, 255, 255, 0.2);
  border-left: 10px solid rgba(255, 255, 255, 1);
  transform: translateZ(0);
  animation: circle-loader-spin 1s infinite linear;
}

.circle-loader-2 {
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  border-top: 10px solid rgba(255, 255, 255, 0);
  border-right: 10px solid rgba(255, 255, 255, 1);
  border-bottom: 10px solid rgba(255, 255, 255, 1);
  border-left: 10px solid rgba(255, 255, 255, 1);
  transform: translateZ(0);
  animation: circle-loader-spin 1s infinite linear;
}

@keyframes circle-loader-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* square loader */

.square-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  animation: rotate 1s infinite ease-in-out;
}

@keyframes rotate {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
  }
}

/* google styled loader */

.google-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100px;
  height: 100px;
}

.google-loader-bar {
  display: inline-block;
  width: 5px;
  height: 50px;
  border-radius: 5px;
  margin: 2px;
  animation: google-loading 1s ease-in-out infinite;
  background-color: #FFFFFF;
}
.google-loader-bar:nth-child(1) {
  animation-delay: 0;
}
.google-loader-bar:nth-child(2) {
  animation-delay: 0.1s;
}
.google-loader-bar:nth-child(3) {
  animation-delay: .2s;
}
.google-loader-bar:nth-child(4) {
  animation-delay: .3s;
}

@keyframes google-loading {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1, 2);
  }
  40% {
    transform: scale(1);
  }
}`,
            JS: ``,
        },
    },
    {
        date: 'Tues Oct 19th',
        solution: {
            HTML: `<h1>Login</h1>
<form>
  <div class="row">
    <label for="email">Email</label>
    <input type="email" name="email" autocomplete="off" placeholder="email@example.com">
  </div>
  <div class="row">
    <label for="password">Password</label>
    <input type="password" name="password">
  </div>
  <button type="submit">Login</button>
</form>`,
            CSS: `body {
  font-family: 'Open Sans', sans-serif;
  background: #f9faff;
  color: #3a3c47;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
}

h1 {
  margin-top: 48px;
}

form {
  background: #fff;
  max-width: 360px;
  width: 100%;
  padding: 58px 44px;
  border: 1px solid ##e1e2f0;
  border-radius: 4px;
  box-shadow: 0 0 5px 0 rgba(42, 45, 48, 0.12);
  transition: all 0.3s ease;
}

.row {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.row label {
  font-size: 13px;
  color: #8086a9;
}

.row input {
  flex: 1;
  padding: 13px;
  border: 1px solid #d6d8e6;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.2s ease-out;
}

.row input:focus {
  outline: none;
  box-shadow: inset 2px 2px 5px 0 rgba(42, 45, 48, 0.12);
}

.row input::placeholder {
  color: #C8CDDF;
}

button {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  background: #15C39A;
  color: #fff;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  margin-top: 15px;
  transition: background 0.2s ease-out;
}

button:hover {
  background: #55D3AC;
}

@media(max-width: 458px) {
  
  body {
    margin: 0 18px;
  }
  
  form {
    background: #f9faff;
    border: none;
    box-shadow: none;
    padding: 20px 0;
  }

}`,
            JS: '',
        },
    },
    {
        date: 'Wed Oct 20th',
        solution: {
            HTML: ``,
            CSS: `:root{
  --size: 50;
  --unit: calc((var(--size) / 769) * 1vmin);
}

html {
  height: 100%;
}

body {
  height: 100%;
  margin: 0;
  background-repeat: no-repeat;
  background: linear-gradient(rgb(247, 211, 95) 100%, transparent);
  overflow:hidden;
}

body:before{
  content:"";
  width: calc(742 * var(--unit));
  height: calc(920 * var(--unit));
  border-radius: calc(35 * var(--unit));
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  margin:auto;
  background:
    radial-gradient(circle at 50% 55%, #6b8dbf 0%, #6b8dbf 30%, transparent 30%),
    radial-gradient(circle at 50% 55%, rgb(72, 217, 217) 0%, rgb(72, 217, 217) 35%, transparent 35%),
    linear-gradient(rgb(72, 217, 217), rgb(72, 217, 217)) 83% 57%/ 3.6vmin 6vmin no-repeat,
    radial-gradient(circle at 67% 7%, #fff 0%, #fff 5%, transparent 5%),
    radial-gradient(circle at 68.5% 7.6%, rgb(51, 156, 156) 0%, rgb(51, 156, 156) 5%, transparent 5%),
    radial-gradient(circle at 87% 7%, #fff 0%, #fff 4.6%, transparent 4.6%),
    radial-gradient(circle at 88.5% 7.6%, rgb(51, 156, 156) 0%, rgb(51, 156, 156) 4.6%, transparent 4.6%),
    radial-gradient(circle at 8% 8%, #9658c4 0%, #9658c4 1.8%, transparent 1.8%),
    radial-gradient(circle at 15% 8%, #9658c4 0%, #9658c4 1.8%, transparent 1.8%),
    radial-gradient(circle at 22% 8%, #9658c4 0%, #9658c4 1.8%, transparent 1.8%), 
    radial-gradient(circle at 29% 8%, #9658c4 0%, #9658c4 1.8%, transparent 1.8%),  
    linear-gradient(rgb(72, 217, 217) 15%, transparent 15%),
    #fff linear-gradient(to bottom, #f2f2f2 0%, #f2f2f2 17%, transparent 17%);
  box-shadow:0 4px #d4b550;
  animation: vibrate 0.5s;
  animation-iteration-count: infinite;
}

body:after{
  content:"";
  position: absolute;
  top: 6vmin;
  left: 0;
  right: 0;
  bottom: 0;
  margin:auto;
  width: calc(330 * var(--unit));
  height: calc(330 * var(--unit)); 
  border-radius:50%;
  background: 
    radial-gradient(circle at 26% 42%, #fff 0%, #fff 2%, transparent 2%),
    radial-gradient(circle at 66% 42%, #fff 0%, #fff 2%, transparent 2%),
    radial-gradient(circle at 30% 45%, #232424 0%, #232424 9%, transparent 9%),
    radial-gradient(circle at 70% 45%, #232424 0%, #232424 9%, transparent 9%),
    #6b8dbf radial-gradient(circle at 50% 0%, #692c04 40%, transparent 40%) 50% 85%/ 10vmin 6vmin no-repeat;
  animation: rotate 2s;
  animation-iteration-count: infinite;
}

@keyframes vibrate{
    0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

@keyframes rotate{
  0%{
    transform:rotate(0deg);
  }
  30%{
    transform:rotate(90deg);
  }
  60%{
    transform:rotate(180deg);
  }
  90%{
    transform:rotate(300deg);
  }
  100%{
    transform:rotate(360deg);
  }
}`,
            JS: '',
        },
    },
    {
        date: 'Thurs Oct 21st',
        solution: {
            HTML: '<h1>Thursday</h1>',
            CSS: '',
            JS: "document.body.style.backgroundColor='yellow'",
        },
    },
    {
        date: 'Fri Oct 22nd',
        solution: {
            HTML: '<h1>Friday</h1>',
            CSS: '',
            JS: "document.body.style.backgroundColor='yellow'",
        },
    },

    {
        date: 'Mon Oct 25th',
        solution: {
            HTML: '<h1>Monday 2</h1>',
            CSS: '',
            JS: "document.body.style.backgroundColor='yellow'",
        },
    },
    {
        date: 'Tues Oct 26th',
        solution: {
            HTML: '<h1>Tuesday 2</h1>',
            CSS: '',
            JS: "document.body.style.backgroundColor='yellow'",
        },
    },
    {
        date: 'Wed Oct 27th',
        solution: {
            HTML: '<h1>Wednesday2</h1>',
            CSS: '',
            JS: "document.body.style.backgroundColor='yellow'",
        },
    },
    {
        date: 'Thurs Oct 28th',
        solution: {
            HTML: `<div class="loaders">
  <div class="loader circle-loader-1"></div>
  <div class="loader circle-loader-2"></div>
  <div class="loader square-loader"></div>
  <div class="loader google-loader">
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
    <div class="google-loader-bar"></div>
  </div>
</div>`,
            CSS: `html, body {
  background-color: #182935;
  width: 100%;
  height: 100%;
  margin: 0px;
}

.loaders {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-wrap: wrap;
}

.loader {
  min-width: 100px;
}

/* circle loaders */

.circle-loader-1 {
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  border-top: 10px solid rgba(255, 255, 255, 0.2);
  border-right: 10px solid rgba(255, 255, 255, 0.2);
  border-bottom: 10px solid rgba(255, 255, 255, 0.2);
  border-left: 10px solid rgba(255, 255, 255, 1);
  transform: translateZ(0);
  animation: circle-loader-spin 1s infinite linear;
}

.circle-loader-2 {
  width: 100px;
  min-width: 100px;
  height: 100px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  border-radius: 50%;
  border-top: 10px solid rgba(255, 255, 255, 0);
  border-right: 10px solid rgba(255, 255, 255, 1);
  border-bottom: 10px solid rgba(255, 255, 255, 1);
  border-left: 10px solid rgba(255, 255, 255, 1);
  transform: translateZ(0);
  animation: circle-loader-spin 1s infinite linear;
}

@keyframes circle-loader-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

/* square loader */

.square-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100px;
  height: 100px;
  background-color: #FFFFFF;
  animation: rotate 1s infinite ease-in-out;
}

@keyframes rotate {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-180deg);
  }
}

/* google styled loader */

.google-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100px;
  height: 100px;
}

.google-loader-bar {
  display: inline-block;
  width: 5px;
  height: 50px;
  border-radius: 5px;
  margin: 2px;
  animation: google-loading 1s ease-in-out infinite;
  background-color: #FFFFFF;
}
.google-loader-bar:nth-child(1) {
  animation-delay: 0;
}
.google-loader-bar:nth-child(2) {
  animation-delay: 0.1s;
}
.google-loader-bar:nth-child(3) {
  animation-delay: .2s;
}
.google-loader-bar:nth-child(4) {
  animation-delay: .3s;
}

@keyframes google-loading {
  0% {
    transform: scale(1);
  }
  20% {
    transform: scale(1, 2);
  }
  40% {
    transform: scale(1);
  }
}`,
            JS: ``,
        },
    },
];
