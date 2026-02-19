from finance.models import Category, CategoryRule, Transaction

def categorize_description(description: str) -> Category:
    desc = description.lower()
    rules = CategoryRule.objects.select_related('category').all()

    for rule in rules:
        if rule.keyword.lower() in desc:
            return rule.category
        
    # No match → return None
    return None

def categorize_transaction(transaction: Transaction) -> None:
    transaction.category = categorize_description(transaction.description)
    transaction.save(update_fields=['category'])
    return transaction

def recategorize_transactions():
    transactions = Transaction.objects.all().select_related('category')
    for transaction in transactions:
        categorize_transaction(transaction)