<script lang="ts">
  import Card from './Card.svelte';
  import { lists } from '../store/lists';
  import { getColorByBgColor } from '../utils';
  import Editor from './Editor.svelte';
  import * as listService from '../api/list';
  import { onMount } from 'svelte';
  import { find, findIndex, forEach, identity, includes, map } from 'lodash-es';
  import CardCreator from './CardCreator.svelte';
  import { dropAction } from '../actions/dropAction';
  import { POS_DEFAULT_GAP } from '../consts';
  import { flip } from 'svelte/animate';
  import { sineInOut } from 'svelte/easing';

  export let listId = '';
  export let title = '';
  export let listColor = '';

  let isEditMode = false;
  let dragging = false;
  let listEl: HTMLElement;
  let cards: Card.Item[] = [];

  onMount(() => {
    lists.subscribe(_lists => {
      forEach(_lists, list => {
        if (list.id === listId) {
          cards = list.cards ?? [];
        }
      });
    });
  });

  function offEditMode() {
    isEditMode = false;

    listEl.style.backgroundColor = listColor;
  }

  function changeListColor(e: CustomEvent) {
    const changedColor = e.detail.color;

    listEl.style.backgroundColor = changedColor;
  }

  function deleteList() {
    if (
      window.confirm(
        '리스트를 포함한 카드 내용 전체가 삭제됩니다.\n정말 삭제하시겠습니까?'
      )
    ) {
      listService.deleteList(listId).then(() => {
        lists.delete(listId);
      });
    }
  }

  function editList(e: CustomEvent) {
    const { content, color } = e.detail;

    listColor = color;

    console.log('listColor : ', listColor);
    listService
      .updateListItem({ listId, title: content, color: listColor })
      .then(() => {
        lists.edit(listId, content, listColor);
      });
  }

  function dragStart(e: DragEvent) {
    dragging = true;
    e.dataTransfer.setData('LIST', listId);
    e.dataTransfer.effectAllowed = 'move';
  }

  function reorderCard(e: CustomEvent) {
    const { id, afterId } = e.detail;
    const isSameList = includes(
      map(cards, card => card.id),
      id
    );

    const afterIndex = findIndex(cards, { id: afterId });

    let pos = 0;

    if (afterIndex === 0) {
      pos = cards[afterIndex].pos / 2;
    } else if (afterIndex === -1) {
      pos = cards[cards.length - 1].pos + POS_DEFAULT_GAP;
    } else {
      pos = (cards[afterIndex - 1].pos + cards[afterIndex].pos) / 2;
    }
    if (isSameList) {
      lists.reorderCard(listId, id, pos);
    } else {
      lists.reorderAcross(listId, id, pos);
    }
  }
</script>

<div
  data-id={listId}
  class="list draggable"
  style="background-color: {listColor}"
  draggable="true"
  class:dragging
  on:dragstart|self={dragStart}
  on:dragend={() => (dragging = false)}
  use:dropAction={{ dataType: 'CARD' }}
  on:reorder={reorderCard}
  bind:this={listEl}
>
  {#if isEditMode}
    <Editor
      {listColor}
      id={listId}
      content={title}
      on:changeColor={changeListColor}
      on:offEditMode={offEditMode}
      {title}
    </p>
    <div class="button-wrapper">
      <span
        class="material-symbols-rounded icon"
        on:click={() => (isEditMode = true)}
      >
        edit
      </span>
      <span class="material-symbols-rounded icon" on:click={deleteList}>
        delete
      </span>
    </div>
  {/if}

  {#each cards as { id: cardId, content } (cardId)}
    <div animate:flip={{ duration: 400, easing: sineInOut }}>
      <Card {listId} {cardId} {content} />
    </div>
  {/each}

  <CardCreator {listId} />
</div>

<style>
  .icon {
    background-color: white;
    opacity: 85%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    cursor: move;
    margin-bottom: 6px;
  }

  .button-wrapper {
    display: none;
  }

  .list {
    position: relative;
    white-space: pre-wrap;
    width: 320px;
    height: fit-content;
    min-height: 140px;
    max-height: 800px;
    border-radius: 20px;
    border: 1px solid black;
    background-color: #f3bc1a;
    padding: 28px;
    box-shadow: 6px 6px 0 black;
    display: flex;
    flex-direction: column;
    gap: 18px;
    overflow-y: scroll;
    font-size: 19px;
    line-height: 135%;
  }

  .list:hover .button-wrapper {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }

  .button-wrapper span {
    cursor: pointer;
  }
</style>
