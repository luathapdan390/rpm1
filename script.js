// Thay thế placeholder này bằng đường link Web App của bạn từ Google Apps Script
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyqwb3GmfS0sTexYsAu5U7ust34-2mzOqe5uUprqUFeslVh0HJIo5llZGT9ZHEYvR8FLg/exec';

const submitButton = document.getElementById('submit-button');
const valueInput = document.getElementById('rpm-value');
const feedbackMessage = document.getElementById('feedback-message');

submitButton.addEventListener('click', async () => {
    const value = valueInput.value.trim();
    if (value === '') {
        feedbackMessage.textContent = 'Vui lòng nhập giá trị RPM.';
        feedbackMessage.style.color = '#dc2626'; // Red
        return;
    }

    feedbackMessage.textContent = 'Đang lưu dữ liệu...';
    feedbackMessage.style.color = '#4a5568'; // Gray

    const data = {
        category: 'Daily RPM',
        value: value
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            feedbackMessage.textContent = 'Lưu thành công! 🎉';
            feedbackMessage.style.color = '#155724'; // Green
            valueInput.value = '';
        } else {
            throw new Error('Lỗi khi gửi dữ liệu.');
        }
    } catch (error) {
        feedbackMessage.textContent = 'Lỗi: ' + error.message;
        feedbackMessage.style.color = '#dc2626'; // Red
    }
});