# Generated by Django 3.1.2 on 2022-01-31 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0009_auto_20220126_1717'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stockbalance',
            name='quantity',
            field=models.DecimalField(decimal_places=12, default=0.0, max_digits=14),
        ),
    ]
