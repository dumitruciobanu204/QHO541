document.getElementById('clearBasketForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        const response = await fetch('/clear-basket', {
            method: 'POST'
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error('Failed to clear basket');
        }
    } catch (error) {
        console.error('Error clearing basket:', error);
    }
});