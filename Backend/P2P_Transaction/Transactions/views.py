from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Transaction
# Create your views here.

def get_transaction(request, id):
    t = Transaction.objects.get(id = id)
    return JsonResponse(t.to_dict())
    

def get_transactions(request):
    transactions = Transaction.objects.all()
    print(transactions)
    return JsonResponse([t.to_dict() for t in transactions])