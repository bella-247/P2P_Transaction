# from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Transaction, User
# Create your views here.

def populate_users():
    User.objects.all().delete()
    users = [
        {"name": "Abel", "email": "abel@example.com", "password": "password1", "phone": "1234567890"},
        {"name": "Mekonnen", "email": "mekonnen@example.com", "password": "password2", "phone": "0987654321"},
        {"name": "Liya", "email": "liya@example.com", "password": "password3", "phone": "1234567891"},
        {"name": "Noah", "email": "noah@example.com", "password": "password4", "phone": "0987654322"},
        {"name": "Daniel", "email": "daniel@example.com", "password": "password5", "phone": "1234567892"},
        {"name": "Sara", "email": "sara@example.com", "password": "password6", "phone": "1234567893"},
        {"name": "Hanna", "email": "hanna@example.com", "password": "password7", "phone": "0987654323"},
        {"name": "Elias", "email": "elias@example.com", "password": "password8", "phone": "1234567894"},
        {"name": "Samuel", "email": "samuel@example.com", "password": "password9", "phone": "1234567895"},
        {"name": "Amanuel", "email": "amanuel@example.com", "password": "password10", "phone": "0987654324"},
        {"name": "Marta", "email": "marta@example.com", "password": "password11", "phone": "1234567896"},
        {"name": "Helen", "email": "helen@example.com", "password": "password12", "phone": "1234567897"},
        {"name": "Biniyam", "email": "biniyam@example.com", "password": "password13", "phone": "1234567898"},
        {"name": "Robel", "email": "robel@example.com", "password": "password14", "phone": "1234567899"},
        {"name": "Elena", "email": "elena@example.com", "password": "password15", "phone": "1234567900"},
        {"name": "Nathan", "email": "nathan@example.com", "password": "password16", "phone": "1234567901"},
    ]
    for user in users:
        if not User.objects.filter(phone=user["phone"]).exists():
            new_user = User.objects.create(**user)
            new_user.save()
            print(new_user)
    print("Users populated successfully!")
    
def populate_transactions():
    Transaction.objects.all().delete()
    transactions = [
        {"sender": User.objects.get(name="Abel"), "reciever": User.objects.get(name="Mekonnen"), "amount": 150, "status": Transaction.Status.Pending},
        {"sender": User.objects.get(name="Liya"), "reciever": User.objects.get(name="Noah"), "amount": 300, "status": Transaction.Status.Completed},
        {"sender": User.objects.get(name="Daniel"), "reciever": User.objects.get(name="Sara"), "amount": 500, "status": Transaction.Status.Failed},
        {"sender": User.objects.get(name="Hanna"), "reciever": User.objects.get(name="Elias"), "amount": 200, "status": Transaction.Status.Completed},
        {"sender": User.objects.get(name="Samuel"), "reciever": User.objects.get(name="Helen"), "amount": 100, "status": Transaction.Status.Pending},
        {"sender": User.objects.get(name="Amanuel"), "reciever": User.objects.get(name="Biniyam"), "amount": 250, "status": Transaction.Status.Completed},
        {"sender": User.objects.get(name="Marta"), "reciever": User.objects.get(name="Robel"), "amount": 350, "status": Transaction.Status.Failed},
        {"sender": User.objects.get(name="Elena"), "reciever": User.objects.get(name="Nathan"), "amount": 50, "status": Transaction.Status.Completed},
    ]
    for transaction in transactions:
        new_transaction = Transaction.objects.create(**transaction)
        new_transaction.save()
        print(new_transaction)
    print("Transactions populated successfully!")


def get_transaction(request, id):
    try:
        t = Transaction.objects.get(id=id)
        if t:
            return JsonResponse(t.to_dict())
        else:
            raise Exception("transaction failed")
    except Exception as e:
        print(str(e))
        return HttpResponse()
        
def get_transactions(request):
        
    transactions = [transaction.to_dict() for transaction in Transaction.objects.all()]
    print(transactions)
    return JsonResponse(transactions, safe=False)

def populate(request):
    populate_users()
    populate_transactions()
    return HttpResponse("Populated successfully")
