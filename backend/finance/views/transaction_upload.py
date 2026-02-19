from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from io import TextIOWrapper
import csv
from finance.models.transaction import Transaction
from finance.services.categorization import categorize_transaction

class UploadTransactionCSV(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    file = request.FILES.get("file")
    
    if not file:
      return Response({"error" : "No file uploaded"}, status=400)
    
    # Decode CSV
    try:
      decoded_file = TextIOWrapper(file, encoding="utf-8")
      reader = csv.DictReader(decoded_file)
    except Exception:
      return Response({"error":"Invalid CSV fromat"}, status=400)
    
    # Loop through rows and save transactions
    for row in reader:
      try:
        tx = Transaction.objects.create(
          user=request.user,
          date=row['Date'],
          description=row['Description'],
          amount=row['Amount'],
          type="income" if float(row['Amount']) > 0 else "expense",
        )
        # Categorize transaction
        categorize_transaction(tx)
      except Exception as e:
        print("Error:",e)
        continue

    return Response({"message":"Transactions uploaded successfully"})