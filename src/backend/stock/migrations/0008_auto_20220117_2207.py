# Generated by Django 3.1.2 on 2022-01-17 22:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0007_auto_20220117_2113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiuser',
            name='name',
            field=models.CharField(max_length=100),
        ),
    ]