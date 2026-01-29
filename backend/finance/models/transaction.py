from django.db import models
from django.contrib.auth.models import User
from finance.models.category import Category

class Transaction(models.Model):
  # stored in db
  INCOME = "income" 
  EXPENSE = "expense"

  # first value stored in db, second will be display at admin
  TYPE_CHOICES = [ (INCOME, "Income"), (EXPENSE, "Expense"), ]

  user = models.ForeignKey(User, on_delete=models.CASCADE)
  date = models.DateField()
  description = models.CharField(max_length=255)
  amount= models.DecimalField(max_digits=10, decimal_places=2)
  category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
  type = models.CharField(max_length=20, choices=TYPE_CHOICES)

  def __str__(self):
    return f"{self.description} - {self.amount}"
