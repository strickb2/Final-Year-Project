# Generated by Django 3.1.2 on 2022-01-26 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0008_auto_20220117_2207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiuser',
            name='balance',
            field=models.DecimalField(blank=True, decimal_places=2, default=0.0, max_digits=6),
        ),
    ]