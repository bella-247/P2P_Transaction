from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_transactions, name = "get_transactions"),
    path("<int:id>/", views.get_transaction, name = "get_transaction"),
    path("populate", views.populate, name = "populate"),
]
