var jstat = this.jStat();

var app = angular.module('binomial',[]);

app.controller('failurerateconfidence', function($scope) {
    $scope.fr=null
    $scope.confidence=95
    $scope.alpha=function() { return (100-$scope.confidence)/100 };
    $scope.confidencetrials=function() { return 1/$scope.alpha()}
    
    $scope.run =function() {
        console.log('1st')
        if (document.getElementById('x').checkValidity() && document.getElementById('N').checkValidity() && document.getElementById('x').value.length != 0 && document.getElementById('N').value.length != 0) {
            
            $scope.fr=Number($scope.x)/Number($scope.N)*100
            $scope.limits=CalcBin($scope.x,$scope.N)
            console.log($scope.limits)
            
            
        }
    }
    
    $scope.changealpha =function() {
        $('#modal-window').animate({
                bottom:'-50px'
            });  
    }
    
    $scope.closealpha=function(){
        $('#modal-window').animate({
                bottom:'-270px'
            });  
        $scope.run()
        
    }
        
    var limits=[]
    $scope.$watch('limits', function() {
        if (limits[0]!=$scope.limits[0] || limits[1]!=$scope.limits[1]){
            u=String($scope.limits[1]*100-$scope.limits[0]*100)+'vw'
            v=String($scope.limits[0]*100-50)+'vw'
            
            $('#red').animate({
                left: v,
                width:u
            })  
        }
        limits=$scope.limits
    });
    function CalcBin(vx,vN) {
        console.log($scope.alpha())
        var vTL=100*$scope.alpha()/2; var vTU=100*$scope.alpha()/2; var vCL=100-100*$scope.alpha()
        var vP = vx/vN
        var dl= 0
        var du= 1
        if(vx==0)
           { dl = "0.0000" } 
        else
            { var v=vP/2; vsL=0; vsH=vP; var p=vTL/100
            while((vsH-vsL)>1e-5) { if(BinP(vN,v,vx,vN)>p) { vsH=v; v=(vsL+v)/2 } else { vsL=v; v=(v+vsH)/2 } }
            dl = v }
        if(vx==vN)
            { du = "1.0000" } 
        else
            { var v=(1+vP)/2; vsL=vP; vsH=1; var p=vTU/100
            while((vsH-vsL)>1e-5) { if(BinP(vN,v,0,vx)<p) { vsH=v; v=(vsL+v)/2 } else { vsL=v; v=(v+vsH)/2 } }
            du = v }

        return [dl,du]
        }

    function BinP(N,p,x1,x2) {
        var q=p/(1-p); var k=0; var v = 1; var s=0; var tot=0
        while(k<=N) {
            tot=tot+v
            if(k>=x1 & k<=x2) { s=s+v }
            if(tot>1e30){s=s/1e30; tot=tot/1e30; v=v/1e30}
            k=k+1; v=v*q*(N+1-k)/k
            }
        return s/tot
        }
});




