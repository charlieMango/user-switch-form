const BASE_URL = 'https://dummyjson.com';

interface IWorkPlace {
    title: string;
    slug: string;
    name: string;
    url: string;
    products: any[];
}

export const api = {
    getWorkplaces: async (): Promise<IWorkPlace['products']> => {
        const response = await fetch(`${BASE_URL}/products`);
        if (!response.ok) throw new Error('Ошибка при загрузке списка мест работы');
        const data = await response.json();
        return data.products.map((item: { title: string }) => item.title);
    },

    sendFormData: async (fullName: string) => {
        const response = await fetch(`${BASE_URL}/products/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: fullName }),
        });
        if (!response.ok) throw new Error('Ошибка при отправке формы');
        return response.json();
    },
};
