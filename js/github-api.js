// Hit enter to execute the Get Repos button
$("#gitHubUserName").keypress(function(event){
    if ($("#gitHubUserName").length > 0) {
        if(event.keyCode === 13){
            event.preventDefault();
            $("#btnGetRepos").click();
        }
    }
});

// Get Repos button
$("#btnGetRepos").click(function() {
    var githubUsername = $('#gitHubUserName').val();
    $('#repoCount').html('');
    $('#repoList').html('');
    $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + githubUsername + "/repos",
        dataType: "json",
        success: function(result) {
            for( i in result ) {
                $("#repoList").append(
                    "<li>"+
                        "<div>Repo: " + result[i].name + "</div>" +
                        "<div>Starred: " + result[i].stargazers_count + "</div>" +
                        "<div>Repo URL: <a href='" + result[i].html_url + "' target='_blank'>" + result[i].html_url + "</a></div>" +
                    "</li>"
                );
                $("#repoUser").html("<span>Owner: " + result[i].owner.login + "</span>");
            }
            $("#repoCount").append("Total Repos: " + result.length);
        }
    });
    $('#gitHubUserName').val('');
});