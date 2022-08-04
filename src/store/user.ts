import { writable } from 'svelte/store';

function createUser() {
  const { subscribe, set } = writable<User>({
    nickname: '',
    kakaoId: 0,
    profileURL: '',
  });

  return {
    subscribe,
    init: user => set(user),
  };
}

export const user = createUser();
