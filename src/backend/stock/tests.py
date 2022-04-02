import json

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
import sys
from .models import *
from .serializers import *

# Create your tests here.
class Registration(APITestCase):

    valid_data = { "username": "test", "name": "Test Case", "email": "test@mail.com", "password": "test",
        "dob": "2000-05-07", "pps_number": "k2323332", "address": "123 address", "phone_number": "0851234567"}
    
    def test_registration_successful(self):
        ''' 
        TEST: Successful Registration 
        '''

        response = self.client.post("/register/", self.valid_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_registration_fail_duplicate(self):
        ''' 
        TEST: Fail Registration Due To Duplicate Entry
        '''
        
        data = { "username": "test", "name": "Test Case", "email": "test@mail.com", "password": "test",
            "dob": "2000-05-07", "pps_number": "k2323332", "address": "123 address", "phone_number": "0851234567"}
        
        response_1 = self.client.post("/register/", self.valid_data)
        self.assertEqual(response_1.status_code, status.HTTP_201_CREATED)

        # Attempt to create the same user twice
        response_2 = self.client.post("/register/", self.valid_data)
        self.assertEqual(response_2.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_registration_fail_invalid_fields(self):
        ''' 
        TEST: Fail Registration Due To Invalid Fields
        '''
        
        data = { "username": "test", "name": "Test Case", "email": "test@mail.com", "password": "test", 
        "dob": "", "pps_number": "k2323332", "address": "123 address", "phone_number": 2342}
        response = self.client.post("/register/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class GetCurrentUser(APITestCase):

    def setUp(self):
        self.user = APIUser.objects.create_user(username="TestCase", password="test", dob="2000-05-07", address="123 lane rd", email="test@mail.com")

    def authenticate(self):
        response = self.client.post(reverse('token_obtain_pair'), {'username': 'TestCase', 'password': 'test'})
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + response.data['access'])
    
    def test_get_current_user_authenticated(self):
        '''
        TEST: Successful Authorized to access current user info
        '''
        self.authenticate()
        response = self.client.get(reverse("apiuser-detail", kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], "test@mail.com")

    def test_get_current_user_unauthenticated(self):
        '''
        TEST: Fail Unauthorized to access current user info
        '''
        self.client.force_authenticate(user=None)
        response = self.client.get(reverse("apiuser-detail", kwargs={'pk': 1}))
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)