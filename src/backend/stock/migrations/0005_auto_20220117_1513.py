# Generated by Django 3.1.2 on 2022-01-17 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock', '0004_auto_20220117_1510'),
    ]

    operations = [
        migrations.AlterField(
            model_name='apiuser',
            name='balance',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='stockbalance',
            name='quantity',
            field=models.DecimalField(decimal_places=8, default=0.0, max_digits=14),
        ),
        migrations.AlterField(
            model_name='stockbalance',
            name='total_purchase_value',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='stocktransaction',
            name='stock_price',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='total',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=6),
        ),
    ]