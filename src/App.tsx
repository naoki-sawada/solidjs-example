import { Component, createSignal, JSX, onCleanup, Show } from "solid-js";
import styles from "./App.module.css";

const App: Component = () => {
  const [count, setCount] = createSignal(0);
  const [timer, setTimer] = createSignal<number | null>(null);
  const clearTimer = () => {
    const t = timer();
    if (t) clearInterval(t);
    setTimer(null);
  };
  const resetTimer = () => {
    clearTimer();
    setCount(0);
  };

  const handleStart: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event
  ) => {
    const timer = setInterval(() => setCount(count() + 1), 1000);
    setTimer(timer);
  };

  const handleReset: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event
  ) => {
    resetTimer();
  };

  const handleStop: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (
    event
  ) => {
    clearTimer();
  };

  onCleanup(() => resetTimer);

  const [getName, setName] = createSignal("");

  const handleChange: JSX.EventHandlerUnion<HTMLInputElement, Event> = (
    event
  ) => {
    setName((event.target as HTMLInputElement).value);
  };

  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, Event> = (
    event
  ) => {
    event.preventDefault();
    alert(`Hello ${getName()}`);
  };

  return (
    <div class={styles.App}>
      <h1>Solid app</h1>

      <section>
        <h2>Counter</h2>
        <div>{count()}</div>
        <div>
          <Show
            when={!timer()}
            fallback={
              <>
                <button onClick={handleStop}>Stop</button>
              </>
            }
          >
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </Show>
        </div>
      </section>

      <section>
        <h2>Input</h2>
        <form onSubmit={handleSubmit}>
          <label for="name">Your name: </label>
          <input
            id="name"
            name="name"
            type="text"
            value={getName()}
            onInput={handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
};

export default App;
