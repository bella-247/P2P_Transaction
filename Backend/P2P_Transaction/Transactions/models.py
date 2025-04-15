from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length = 50)
    email = models.CharField(max_length = 100, unique=True)
    password = models.CharField(max_length = 100)
    phone = models.CharField(max_length = 20, unique=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        
    
class Transaction(models.Model):
    class Status(models.IntegerChoices):
        Pending = 1, "Pending"
        Completed = 2, "Completed"
        Failed = 3, "Failed"
        
    class PaymentMethod(models.IntegerChoices):
        Cash = 1, 
        Card = 2,
        Mobile = 3,
        Online = 4,
        
    class TransactionType(models.IntegerChoices):
        Payment = 1,
        Loan = 2
    
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "sent_transactions")
    reciever = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "recieved_transactions")
    amount = models.IntegerField()
    status = models.IntegerField(choices=Status.choices, default=Status.Pending)
    transaction_type = models.IntegerField(choices = TransactionType.choices, default = TransactionType.Payment)
    payment_method = models.IntegerField(choices=PaymentMethod.choices, default = PaymentMethod.Cash)
    created_at = models.DateTimeField(auto_now_add = True)
    updated_at = models.DateTimeField(auto_now = True)
    
    def to_dict(self):
        return {
            "id" : self.id,
            "sender" : self.sender.name,
            "reciever" : self.reciever.name,
            "amount" : self.amount,
            "status" : self.status,
            "transaction_type" : self.transaction_type,
            "payment_method" : self.payment_method,
            "created_at" : self.created_at,
            "updated_at" : self.updated_at
        }