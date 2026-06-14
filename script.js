function convertTemperature() {
    // Get input value
    const tempInput = document.getElementById('temperature').value;
    const errorElement = document.getElementById('error');
    
    // Validate input
    if (tempInput === '' || isNaN(tempInput)) {
        errorElement.textContent = 'Please enter a valid number';
        document.getElementById('resultSection').style.display = 'none';
        return;
    }
    
    errorElement.textContent = '';
    const temperature = parseFloat(tempInput);
    
    // Get input unit
    const inputUnit = document.querySelector('input[name="inputUnit"]:checked').value;
    
    // Get output units (multiple selections)
    const outputUnits = Array.from(
        document.querySelectorAll('input[name="outputUnit"]:checked')
    ).map(checkbox => checkbox.value);
    
    if (outputUnits.length === 0) {
        errorElement.textContent = 'Please select at least one output unit';
        document.getElementById('resultSection').style.display = 'none';
        return;
    }
    
    // Convert to Celsius first (as base unit)
    let celsius;
    
    switch(inputUnit) {
        case 'celsius':
            celsius = temperature;
            break;
        case 'fahrenheit':
            celsius = (temperature - 32) * 5 / 9;
            break;
        case 'kelvin':
            celsius = temperature - 273.15;
            break;
        default:
            celsius = temperature;
    }
    
    // Convert from Celsius to target units
    const results = {};
    
    outputUnits.forEach(unit => {
        switch(unit) {
            case 'celsius':
                results.celsius = celsius;
                break;
            case 'fahrenheit':
                results.fahrenheit = (celsius * 9 / 5) + 32;
                break;
            case 'kelvin':
                results.kelvin = celsius + 273.15;
                break;
        }
    });
    
    // Display results
    displayResults(results);
}

function displayResults(results) {
    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = '';
    
    const units = {
        celsius: '°C',
        fahrenheit: '°F',
        kelvin: 'K'
    };
    
    const unitNames = {
        celsius: 'Celsius',
        fahrenheit: 'Fahrenheit',
        kelvin: 'Kelvin'
    };
    
    Object.entries(results).forEach(([unit, value]) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.innerHTML = `
            <div>
                <span class="result-unit">${unitNames[unit]}</span>
            </div>
            <div>
                <span class="result-value">${value.toFixed(2)}</span>
                <span class="result-unit">${units[unit]}</span>
            </div>
        `;
        resultDisplay.appendChild(resultItem);
    });
    
    document.getElementById('resultSection').style.display = 'block';
}

// Allow Enter key to trigger conversion
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('temperature').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            convertTemperature();
        }
    });
});