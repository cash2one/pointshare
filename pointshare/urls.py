from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pointshare.views.home', name='home'),
    # url(r'^pointshare/', include('pointshare.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^sharepoint','sharepoint.views.sharepoint',name='sharepoint'),
    url(r'^add','sharepoint.views.PointAddView',name='PointAddView'),
    url(r'^\d','sharepoint.views.PointUpdateView',name='PointUpdateView'),
    url(r'^point_add','sharepoint.views.point_add',name='point_add'),
    url(r'^upload_file','sharepoint.views.upload_file',name='upload_file'),
    url(r'^download','sharepoint.views.download',name='download'),
)
