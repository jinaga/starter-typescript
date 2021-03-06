// Thanks to Dan Fabulich
// Strategy outlined in https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68

function listenForWaitingServiceWorker(reg: ServiceWorkerRegistration, callback: (reg: ServiceWorkerRegistration) => void) {
  function awaitStateChange() {
    reg.installing.addEventListener('statechange', function() {
      if (this.state === 'installed') callback(reg);
    });
  }
  if (!reg) return;
  if (reg.waiting) return callback(reg);
  if (reg.installing) awaitStateChange();
  reg.addEventListener('updatefound', awaitStateChange);
}

export type PromptForRefreshFunction = (refresh: () => void) => void;

function promptUserToRefresh(promptForRefresh: PromptForRefreshFunction) {
  return (reg: ServiceWorkerRegistration) => {
    promptForRefresh(() => {
      reg.waiting.postMessage({ type: 'SKIP_WAITING' });
    });
  }  
}

export function registerServiceWorker(promptForRefresh: PromptForRefreshFunction) {
  if ('serviceWorker' in navigator) {
    (async () => {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log(`Registered service worker with scope ${registration.scope}.`);

      listenForWaitingServiceWorker(registration, promptUserToRefresh(promptForRefresh));
    })().catch(err => console.log(`Service worker registration failed: ${err}`));

    // reload once when the new Service Worker starts activating
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange',
      () => {
        if (refreshing) return;
        refreshing = true;
        window.location.reload();
      }
    );
  }
}
