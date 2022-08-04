import { request } from './api';

export async function loadMainData(): Promise<any> {
  return await request('http://175.45.194.105:3000/api/main');
}

export async function loadLists(): Promise<any> {
  return await request('http://175.45.194.105:3000/api/list');
}

export async function loadCards(): Promise<any> {
  return await request('http://175.45.194.105:3000/api/card');
}

export async function addListItem({
  title,
  color,
}: {
  title: string;
  color: string;
}): Promise<any> {
  return await request(`http://175.45.194.105:3000/api/list`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      color,
    }),
  });
}

export async function updateListItem({
  listId,
  title,
  color,
}: {
  listId: string;
  title: string;
  color: string;
}): Promise<any> {
  return await request(`http://175.45.194.105:3000/api/list/${listId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, color }),
  });
}

export async function reorderListItem({
  listId,
  pos,
}: {
  listId: string;
  pos: number;
}): Promise<any> {
  return await request(
    `http://175.45.194.105:3000/api/list/reorder/${listId}`,
    {
      method: 'PUT',
      body: JSON.stringify({ pos }),
    }
  );
}

export async function deleteList(listId: string): Promise<any> {
  return await request(`http://175.45.194.105:3000/api/list/${listId}`, {
    method: 'DELETE',
  });
}

export async function addCardItem({
  listId,
  content,
}: {
  listId: string;
  content: string;
}): Promise<any> {
  return await request(`http://175.45.194.105:3000/api/card`, {
    method: 'POST',
    body: JSON.stringify({
      listId,
      content,
    }),
  });
}

export async function addListWithCard({
  cardId,
  color,
}: {
  cardId: string;
  color: string;
}): Promise<any> {
  return await request(`http://175.45.194.105:3000/api/list/copy`, {
    method: 'POST',
    body: JSON.stringify({
      cardId,
      color,
    }),
  });
}
