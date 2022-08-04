<script lang="ts">
  import ListCreater from './ListCreater.svelte';
  import List from './List.svelte';
  import { lists } from '../store/lists';
  import { cards } from '../store/cards';
  import { dropAction } from '../actions/dropAction';
  import { onMount } from 'svelte';
  import * as listService from '../api/list';
  import { POS_DEFAULT_GAP } from '../consts';
  import { findIndex, sortBy } from 'lodash-es';
  import { flip } from 'svelte/animate';
  import { sineInOut } from 'svelte/easing';
  import { user } from '../store/user';

  $: cardsList = $cards.reduce((acc, card) => {
    acc[card.listId] = acc[card.listId] || [];
    acc[card.listId].push(card);
    acc[card.listId] = sortBy(acc[card.listId], ['pos']);
    return acc;
  }, {});

  onMount(() => {
    listService.loadMainData().then(({ user: userData }) => {
      user.init(userData);
      console.log(userData);
    });

    listService.loadLists().then(({ data }) => {
      lists.init(data);
    });

    listService.loadCards().then(({ data }) => {
      cards.init(data);
    });
  });

  function reorderList(e: CustomEvent) {
    const { id, afterId } = e.detail;

    const afterIndex = findIndex($lists, { id: afterId });
    let pos = 0;

    if (afterIndex === 0) {
      pos = $lists[afterIndex].pos / 2;
    } else if (afterIndex === -1) {
      pos = $lists[$lists.length - 1].pos + POS_DEFAULT_GAP;
    } else {
      pos = ($lists[afterIndex - 1].pos + $lists[afterIndex].pos) / 2;
    }

    listService.reorderListItem({ listId: id, pos }).then(() => {
      lists.reorder(id, pos);
    });
  }
</script>

<div class="wrapper">
  <div
    class="list-container"
    use:dropAction={{ dataType: 'LIST' }}
    on:reorder={reorderList}
  >
    {#each $lists as { id: listId, title, color: listColor } (listId)}
      <div animate:flip={{ duration: 400, easing: sineInOut }}>
        <List {listId} {title} {listColor} cardList={cardsList[listId] ?? []} />
      </div>
    {/each}
    <ListCreater />
  </div>
</div>

<style>
  .wrapper {
    width: fit-content;
    min-height: calc(100% - 50px);
    display: flex;
    gap: 50px;
  }

  .list-container {
    display: flex;
    gap: 50px;

    width: calc(100vw - 100px);
  }
</style>
