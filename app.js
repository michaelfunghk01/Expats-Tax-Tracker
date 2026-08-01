const form = document.getElementById('tax-form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const income = Number(document.getElementById('income').value);
  const deductions = Number(document.getElementById('deductions').value);
  const status = document.getElementById('status').value;

  const taxableIncome = Math.max(income - deductions, 0);
  const standardDeduction = status === 'married' ? 29200 : 14600;
  const taxableAfterDeduction = Math.max(taxableIncome - standardDeduction, 0);
  const estimatedTax = taxableAfterDeduction * 0.2;

  result.innerHTML = `
    <h2>Estimate</h2>
    <p><strong>Taxable income:</strong> $${taxableAfterDeduction.toLocaleString()}</p>
    <p><strong>Estimated tax:</strong> $${estimatedTax.toLocaleString()}</p>
  `;
});
