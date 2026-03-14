// Configuration for Tiers
const LOYALTY_CONFIG = [
    { name: 'GOLD', min: 1000, discount: 0.15, color: '#ffd700' },
    { name: 'SILVER', min: 500, discount: 0.10, color: '#c0c0c0' },
    { name: 'BRONZE', min: 100, discount: 0.05, color: '#cd7f32' },
    { name: 'NONE', min: 0, discount: 0, color: '#eee' }
];

// Integration function
function handleCustomerSelect(customerData) {
    const panel = document.getElementById('loyalty-panel');
    panel.style.display = 'block'; // Show panel once customer is picked

    // Finding the current tier based on their lifetime spend
    const currentTier = LOYALTY_CONFIG.find(t => customerData.totalSpent >= t.min);
    const nextTier = LOYALTY_CONFIG[LOYALTY_CONFIG.indexOf(currentTier) - 1];

    // Updating UI Elements
    document.getElementById('selected-customer-name').innerText = customerData.name;
    document.getElementById('lifetime-spend').innerText = `$${customerData.totalSpent}`;
    
    const badge = document.getElementById('tier-badge');
    badge.innerText = currentTier.name;
    badge.style.backgroundColor = currentTier.color;

    // Handling Progress Bar
    if (nextTier) {
        const progress = (customerData.totalSpent / nextTier.min) * 100;
        document.getElementById('loyalty-progress').style.width = `${Math.min(progress, 100)}%`;
        document.getElementById('loyalty-msg').innerText = `Spend $${(nextTier.min - customerData.totalSpent).toFixed(2)} more for ${nextTier.name}`;
    } else {
        document.getElementById('loyalty-progress').style.width = '100%';
        document.getElementById('loyalty-msg').innerText = "Top Tier Reached! 🚀";
    }

    // Applying Discount to Checkout Total
    applyLoyaltyDiscount(currentTier.discount);
}

function applyLoyaltyDiscount(rate) {
    const subtotal = parseFloat(document.getElementById('cart-subtotal').innerText);
    const discountAmount = subtotal * rate;
    const finalTotal = subtotal - discountAmount;
    
    document.getElementById('discount-pct').innerText = (rate * 100);
    document.getElementById('final-total-display').innerText = finalTotal.toFixed(2);
    
    // Showing banner only if there is a discount
    document.getElementById('discount-banner').style.display = rate > 0 ? 'block' : 'none';
}
