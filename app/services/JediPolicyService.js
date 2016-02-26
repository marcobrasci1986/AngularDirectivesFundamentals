app.factory('jediPolicyService', function ($q) {
    return {
        advanceToKnight: function (candidate) {
            var promise = $q(function (resolve, reject) {
                if (candidate.hasForce &&
                    (candidate.yearsOfJediTraining > 20 || candidate.isChosenOne || (candidate.master === 'Yoda' && candidate.yearsOfJediTraining > 3)
                    && candidate.masterApproves
                    && candidate.passedTrials)) {

                    candidate.rank = 'Jedi Knight';
                    resolve(candidate); //  success callback
                }else{
                    reject(candidate); // error callback
                }
            });

            return promise;
        }
    }
});