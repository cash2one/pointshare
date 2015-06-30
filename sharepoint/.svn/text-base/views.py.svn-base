# -*- coding: utf-8 -*-
# Create your views here.
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt

from sharepoint.models import Point
from django.http import HttpResponse
import json
import time
from datetime import datetime
import os
from django.http import HttpResponseRedirect


import logging
#from datetime import *


@csrf_exempt
def sharepoint(request):


    pointSet = Point.objects.order_by('id').all()
    static_TIME = datetime.strptime("01/01/2100","%m/%d/%Y")
    return render_to_response('dateapp/index.html',locals())



def PointAddView(request):
    return render_to_response('dateapp/addPoint.html',locals())


def PointUpdateView(request):
    try:
        PATH_INFO = request.META['PATH_INFO']
    except KeyError:
        PATH_INFO = 'unknown'
        return HttpResponse("Hello world,Your PATH_INFO is %s" % PATH_INFO)

    PointId = PATH_INFO.split('/')[1]
    point = Point.objects.filter(id=PointId)[0]

    return render_to_response('dateapp/addPoint.html',locals())


@csrf_exempt
def point_add(request):
    try:
        #if  request.is_ajax():
            if request.method == "POST":
                PointName = request.POST['PointName']
                PointInitiator = request.POST['PointInitiator']
                PointStatus = request.POST['PointStatus']
                PointDetail = request.POST['PointDetail'].strip()
                PointRealize = request.POST['PointRealize']
                timenow =datetime.now()
                pathname =request.POST["pathname"].split('/')[1]
                #request.POST.get('pathname',None)
                END_TIME = request.POST['PointEndtime']
                static_TIME = datetime.strptime("01/01/2100","%m/%d/%Y")
                if END_TIME!="":
                    END_TIME =datetime.strptime(request.POST['PointEndtime'],"%m/%d/%Y")
                else:
                    END_TIME = static_TIME
                #%Y-%m-%d %H:%M:%S
                file_name=""
                file_obj = request.FILES.get('your_file', None)
                if file_obj != None:
                    HERE = os.path.dirname(os.path.abspath(__file__))
                    parent =os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
                    file_name = file_obj._name
                    file_full_path = os.path.join(parent+'/media/',file_name)
                    destination = open(file_full_path,'wb+')
                    for chunk in file_obj.chunks():
                        destination.write(chunk)
                        destination.close()


                if(pathname=="add"):
                    point = Point.objects.create(POINT_NAME=PointName,POINT_DETAIL=PointDetail,POINT_INITIATOR=PointInitiator,POINT_REALIZE=PointRealize,BEGIN_TIME=timenow,STATUS=PointStatus,POINT_ATT=file_name,END_TIME=END_TIME)

                    return HttpResponseRedirect('/sharepoint/')
                else:
                    pointId = pathname
                    Point.objects.filter(id=pointId).update(POINT_NAME=PointName,POINT_DETAIL=PointDetail,POINT_INITIATOR=PointInitiator,POINT_REALIZE=PointRealize,STATUS=PointStatus,POINT_ATT=file_name,END_TIME=END_TIME)
                    return HttpResponseRedirect('/sharepoint/')

    except Exception,ex:
        return HttpResponse(json.dumps({"status":ex}),mimetype='application/json')


@csrf_exempt
def upload_file(request):
    if request.method == "POST":
        file_obj = request.FILES.get('your_file', None)
        if file_obj != None:
            HERE = os.path.dirname(os.path.abspath(__file__))
            parent =os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
            file_name = file_obj._name
            file_full_path = os.path.join(parent+'/media/',file_name)
            destination = open(file_full_path,'wb+')
            for chunk in file_obj.chunks():
                destination.write(chunk)
                destination.close()
            return HttpResponseRedirect('/add/')

@csrf_exempt
def download(request):
        try:
            PATH_INFO = request.META['PATH_INFO']

        except KeyError:
            PATH_INFO = 'unknown'
            return HttpResponse("Hello world,Your PATH_INFO is %s" % PATH_INFO)

        file_name = PATH_INFO.split('/')[2]
        parent =os.path.abspath(os.path.dirname(os.path.dirname(__file__)))
        file_full_path = os.path.join(parent+'/media/',file_name)

        data = readFile(file_full_path)
        #response = HttpResponse(data)


        response =  HttpResponse(data,mimetype='application/octet-stream')
        response['Content-Type'] = 'application/force-download'
        Content = 'attachment; filename=%s'%file_name
        response['Content-Disposition'] = Content

        return response


def readFile(fn, buf_size=262144):
        f = open(fn, "rb")
        while True:
            c = f.read(buf_size)
            if c:
                yield c
            else:
                break
        f.close()

