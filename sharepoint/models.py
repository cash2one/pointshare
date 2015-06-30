from django.db import models
from django.db.models.fields.related import ForeignKey

# Create your models here.

class Point(models.Model):
    POINT_NAME = models.CharField(max_length=200)
    POINT_DETAIL = models.CharField(max_length=200)
    POINT_ATT = models.CharField(max_length=200)
    POINT_INITIATOR = models.CharField(max_length=200)
    POINT_REALIZE = models.CharField(max_length=200)
    BEGIN_TIME = models.DateTimeField(auto_now_add=True)
    END_TIME = models.DateTimeField(auto_now_add =False)
    STATUS = models.IntegerField()
        
    def __unicode__(self):
        return self.POINT_NAME
    class Meta:
        db_table="Point"


