{
  "undefined" == typeof ocContent && (ocContent = {});
  const b = "com.linkedin.voyager.identity.profile.actions.InvitationPending";
  function e(e, t) {
    let n = 0;
    return {
      profiles: e.elements
        .filter((e) => {
          e = "visit" === t.currentAction || !1 === e.pendingInvitation;
          return e || n++, e;
        })
        .map(function (e) {
          var t = e.entityUrn,
            t = t.substring(t.indexOf("(") + 1, t.length - 1).split(",")[0];
          return {
            id: t,
            link: "/in/" + t + "/",
            title:
              e.currentPositions && e.currentPositions.length
                ? e.currentPositions[0].title +
                  " at " +
                  e.currentPositions[0].companyName
                : null,
            name: o(e.firstName + " " + e.lastName),
            premium: e.premium,
          };
        }),
      total: e.paging.total,
      pendingInvitesNumber: n,
    };
  }
  function s(e) {
    return e
      .replace("urn:li:fsd_entityResultViewModel:(urn:li:fsd_profile:", "")
      .replace(",SEARCH_SRP", "")
      .replace(",DEFAULT)", "");
  }
  function a(e) {
    return e ? e.replace(/&#(\d*);/g, (e, t) => String.fromCharCode(t)) : "";
  }
  function t(e, n) {
    if (
      !(
        e.result &&
        ((e.result.searchResults && e.result.searchResults.length) ||
          (e.result.searchHits && e.result.searchHits.length))
      )
    )
      return [];
    let i = (e.result.searchResults || e.result.searchHits).filter(
      (e) => e.niid
    );
    var t = i.map((e) => e.niid);
    let r = 0;
    return T(t, n.headers.csrfToken).then((t) => {
      return {
        profiles: i
          .filter((e) => {
            e = "visit" === n.currentAction || !t[e.niid];
            return e || r++, e;
          })
          .map((e) => ({
            id: e.niid,
            link: "/in/" + e.niid + "/",
            title: a(P(e.headline)),
            name: "LinkedIn Member" === e.fullName ? null : a(e.fullName),
            premium: e.isPremiumSubscriber,
          })),
        total: e.meta ? e.meta.total : e.result.paging.count,
        pendingInvitesNumber: r,
      };
    });
  }
  function n(n, i) {
    if (!n.projectView) return { profiles: [], total: 1 };
    let r = n.projectView.profileId;
    return T([r], i.headers.csrfToken).then((e) => {
      var t = n.profile.miniProfile.publicIdentifier,
        e =
          "visit" !== i.currentAction && e[r]
            ? []
            : [
                {
                  id: t,
                  link: "/in/" + t + "/",
                  title: a(P(n.profile.headline)),
                  name: a(o(n.profile.firstName + " " + n.profile.lastName)),
                  premium: "Not defined",
                },
              ];
      return { profiles: e, total: 1, pendingInvitesNumber: e.length ? 0 : 1 };
    });
  }
  function i(e, i) {
    let r = e.elements.filter(
      (e) =>
        e.memberProfileResolutionResult &&
        e.memberProfileResolutionResult.entityUrn
    );
    var t = r.map((e) =>
      e.memberProfileResolutionResult.entityUrn.replace(
        "urn:li:ts_profile:",
        ""
      )
    );
    return T(t, i.headers.csrfToken).then((t) => {
      let n = 0;
      return {
        profiles: r
          .filter((e) => {
            e = "visit" === i.currentAction || !t[e.niid];
            return e || n++, e;
          })
          .filter((e) => !!e.memberProfileResolutionResult.publicProfileUrl)
          .map((e) => {
            var e = e.memberProfileResolutionResult,
              t = e.publicProfileUrl.replace(/(.*).linkedin.com\/in\//, "");
            return {
              id: t,
              link: "/in/" + t + "/",
              title: a(P(e.headline)),
              name: a(o(e.firstName + " " + e.lastName)),
              premium:
                !!e.privacySettings &&
                !!e.privacySettings.showPremiumSubscriberIcon,
            };
          }),
        total: e.paging.total,
        pendingInvitesNumber: n,
      };
    });
  }
  function P(e) {
    var t = document.createElement("div");
    return (t.innerHTML = e), t.textContent || t.innerText || "";
  }
  let l = {
      oldSalesSelect: {
        mapResponseToProfiles: function (t, i) {
          var e = t.searchResults.map(function (t) {
            let n = t.member;
            var e = n.profileId;
            return r(e, i.headers).then((e) => ({
              id: e,
              link: "/in/" + e + "/",
              name: o(n.formattedName),
              premium: t.badges.isShowSubscriber,
            }));
          });
          return Promise.all(e).then((e) => ({
            profiles: e,
            total: t.pagination.total,
          }));
        },
      },
      newSalesSelect: { mapResponseToProfiles: e },
      salesProfileSelect: { mapResponseToProfiles: n },
      salesLeadSelect: { mapResponseToProfiles: e },
      defaultSelect: {
        mapResponseToProfiles: function (e, n) {
          var t = e.elements;
          if (!t.length) return [];
          t = t.filter((e) => !!e.results);
          if (!t.length) return [];
          let i = t[0].results;
          t = i.map((e) => s(e.entityUrn));
          let r = 0;
          return T(t, n.headers.csrfToken).then((t) => {
            return {
              profiles: i
                .filter((e) => {
                  e = "visit" === n.currentAction || !t[s(e.entityUrn)];
                  return e || r++, e;
                })
                .map(function (e) {
                  t = e.navigationUrl;
                  var t = new URL(t).pathname
                    .replace("in/", "")
                    .replaceAll("/", "");
                  return {
                    id: t,
                    link: "/in/" + t + "/",
                    title: e.primarySubtitle ? e.primarySubtitle.text : null,
                    name: e.title.text,
                    premium: !!e.badgeIcon,
                  };
                }),
              total: i.length ? e.paging.count : 0,
              pendingInvitesNumber: r,
            };
          });
        },
      },
      defaultProfileSelect: { mapResponseToProfiles: n },
      myNetwork: {
        mapResponseToProfiles: function (e, t) {
          let n = e.elements.map(function (e) {
            var e = e.miniProfile,
              t = e.publicIdentifier;
            return {
              id: t,
              link: "/in/" + t + "/",
              title: e.occupation,
              name: o(e.firstName + " " + e.lastName),
              premium: "Not defined",
            };
          });
          return fetch(
            "https://www.linkedin.com/voyager/api/relationships/connectionsSummary",
            {
              method: "GET",
              headers: {
                "csrf-token": t.headers.csrfToken,
                "x-restli-protocol-version": "2.0.0",
                "x-requested-with": "XMLHttpRequest",
              },
              credentials: "same-origin",
            }
          )
            .then((e) => e.json())
            .then((e) => ({
              profiles: n,
              total: e.numConnections,
              pendingInvitesNumber: 0,
            }));
        },
      },
      recruiterSelect: { mapResponseToProfiles: t },
      recruiterProjectsSelect: { mapResponseToProfiles: t },
      recruiterProfileSelect: { mapResponseToProfiles: n },
      talentSelect: { mapResponseToProfiles: i },
      talentProjectsSelect: { mapResponseToProfiles: i },
    },
    r = function (e, t) {
      return c(e, t).then((e) =>
        e.profile ? e.profile.miniProfile.publicIdentifier : "$ "
      );
    },
    c = function (e, t) {
      return fetch(
        "https://www.linkedin.com/voyager/api/identity/profiles/" +
          e +
          "/profileView",
        {
          headers: {
            accept: "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "csrf-token": t.csrfToken,
          },
          credentials: "same-origin",
        }
      ).then(function (e) {
        return e.json();
      });
    };
  function I(e, t, n) {
    return fetch(
      "https://www.linkedin.com/voyager/api/relationships/invitations?folder=SENT&count=" +
        t +
        "&start=" +
        e,
      {
        method: "GET",
        headers: {
          "csrf-token": n.csrfToken,
          "x-restli-protocol-version": "2.0.0",
          "x-requested-with": "XMLHttpRequest",
        },
        credentials: "same-origin",
      }
    ).then((e) => e.json());
  }
  function C() {
    return new Promise(function (e) {
      chrome.runtime.sendMessage({ action: "getProfileData" }, e);
    });
  }
  let u = function (e, t, n, i) {
      let r = {
        "csrf-token": n,
        "x-restli-protocol-version": "2.0.0",
        "x-requested-with": "XMLHttpRequest",
      };
      return (
        i && Object.keys(i).forEach((e) => (r[e] = i[e])),
        fetch(t, { method: e, headers: r, credentials: "same-origin" }).then(
          (e) => e.json()
        )
      );
    },
    p = function (e) {
      return C()
        .then(function (t) {
          return fetch("https://www.linkedin.com/voyager/api/me", {
            method: "GET",
            headers: {
              accept: "*/*",
              "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
              "content-type": "application/json; charset=UTF-8",
              "csrf-token": t.csrfToken,
              "x-requested-with": "XMLHttpRequest",
            },
            credentials: "same-origin",
          }).then((e) => ({ response: e, headers: t }));
        })
        .then(function (t) {
          return 200 == t.response.status
            ? t.response.json().then((e) => ({ json: e, headers: t.headers }))
            : { headers: t.headers };
        })
        .then((t) =>
          t.json
            ? u(
                "GET",
                "https://www.linkedin.com/voyager/api/growth/emailsPrefill",
                t.headers.csrfToken
              )
                .then((e) => ((t.json.email = e.emailAddress), t))
                .catch((e) => (console.error(e), t))
            : t
        )
        .then((e) => {
          var t;
          return (
            e.json &&
              ((t = e),
              y(t.headers, t.json.miniProfile.publicIdentifier).then((e) => {
                chrome.runtime.sendMessage({
                  action: "refreshDashboard",
                  data: e,
                });
              })),
            e.json
          );
        })
        .then(function (e) {
          return e
            ? {
                id: e.miniProfile.entityUrn.substring(22),
                name: e.miniProfile.firstName,
                lastName: e.miniProfile.lastName,
                email: e.email,
                image: (function (e) {
                  if (
                    !e.picture ||
                    !e.picture["com.linkedin.common.VectorImage"]
                  )
                    return null;
                  let t = e.picture["com.linkedin.common.VectorImage"];
                  return (
                    t.rootUrl + t.artifacts[1].fileIdentifyingUrlPathSegment
                  );
                })(e.miniProfile),
                signedState: "SIGNING_IN_PROGRESS",
              }
            : {
                name: null,
                image: null,
                email: null,
                id: null,
                signedState: "SIGNED_OUT",
              };
        });
    },
    m = function (n, i, r, o) {
      n.publicIds || (n.publicIds = {});
      let s = o ? 40 : 2e3;
      return fetch(
        "https://www.linkedin.com/voyager/api/relationships/connections?sortType=RECENTLY_ADDED&count=" +
          s +
          "&start=" +
          i,
        {
          method: "GET",
          headers: {
            "csrf-token": r.csrfToken,
            "x-restli-protocol-version": "2.0.0",
            "x-requested-with": "XMLHttpRequest",
          },
          credentials: "same-origin",
        }
      )
        .then((e) => e.json())
        .then((e) => {
          if (e.elements && e.elements.length) {
            for (var t of e.elements) {
              if (o >= t.createdAt) return n;
              (!n.lastAcceptedInviteDate ||
                t.createdAt > n.lastAcceptedInviteDate) &&
                (n.lastAcceptedInviteDate = t.createdAt),
                t.miniProfile &&
                  t.miniProfile.publicIdentifier &&
                  (n.publicIds[t.miniProfile.publicIdentifier] = {
                    profileId: t.miniProfile.entityUrn.replace(
                      "urn:li:fs_miniProfile:",
                      ""
                    ),
                  });
            }
            return m(n, (i += s), r, o);
          }
          return n;
        });
    },
    d = function (n, i, r, o, s) {
      let a = 100 < r ? 100 : r;
      return I(i, a, o).then((e) => {
        var t;
        return e.elements &&
          e.elements.length &&
          ((t = e.elements.length), s(n, e), (e = r ? r - t : 0), t >= a) &&
          (!r || 0 < e)
          ? d(n, (i += a), e, o, s)
          : n;
      });
    },
    f = async function (e, t) {
      var n;
      return e < 0
        ? 0
        : e <= 100
        ? e
        : 0 <
          (n = await I(e, 100, t).then((e) =>
            e.elements && e.elements.length ? e.elements.length : 0
          ))
        ? e + n
        : f(e - 100, t);
    },
    h = function (e, t) {
      let n = 100 < e.length;
      var i = n ? e.slice(0, 100) : e;
      return fetch(
        "https://www.linkedin.com/voyager/api/relationships/invitations?action=closeInvitations",
        {
          method: "POST",
          body: JSON.stringify({
            inviteActionData: i,
            inviteActionType: "WITHDRAW",
          }),
          headers: {
            "csrf-token": t.headers.csrfToken,
            "x-restli-protocol-version": "2.0.0",
            "x-requested-with": "XMLHttpRequest",
          },
          credentials: "same-origin",
        }
      ).then(() => !n || h(e.slice(100, e.length), t));
    },
    g = async function (e, t, n, i) {
      if (i < 156465144e4) return e;
      var r,
        i = i ? "&createdBefore=" + (i - 1) : "",
        i = await u(
          "GET",
          "https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&count=20" +
            i,
          n.csrfToken
        );
      if (!i || !i.elements || !i.elements.length) return e;
      for (r of i.elements)
        if (r && r.participants && r.participants.length) {
          var o =
            r.participants[0]["com.linkedin.voyager.messaging.MessagingMember"];
          if (o && o.miniProfile) {
            var o = o.miniProfile,
              s = o.entityUrn.replace("urn:li:fs_miniProfile:", ""),
              a = r.entityUrn.replace("urn:li:fs_conversation:", "");
            if (r.events && r.events.length) {
              var l = r.events[0];
              if (e.previousMessageEventDate >= l.createdAt) return e;
              l.from &&
                l.from["com.linkedin.voyager.messaging.MessagingMember"] &&
                (l.from[
                  "com.linkedin.voyager.messaging.MessagingMember"
                ].entityUrn.includes(t)
                  ? 1 < r.totalEventCount &&
                    "UNKNOWN" !== o.publicIdentifier &&
                    (e.publicId2ConversationChecks[o.publicIdentifier] = {
                      toCheck: !0,
                      profile: { profileId: s, conversationId: a },
                      eventCreatedAt: l.createdAt,
                    })
                  : (e.publicId2ConversationChecks[o.publicIdentifier] = {
                      profileResponded: !0,
                      profile: { profileId: s, conversationId: a },
                      eventCreatedAt: l.createdAt,
                    }),
                !e.lastMessageEventDate ||
                  e.lastMessageEventDate < l.createdAt) &&
                (e.lastMessageEventDate = l.createdAt);
            }
          }
        }
      await v(1e3);
      i = i.elements[i.elements.length - 1];
      return i && i.events && i.events.length
        ? g(e, t, n, i.events[0].createdAt)
        : e;
    },
    v = function (t) {
      return new Promise((e) => {
        setTimeout(e, t);
      });
    },
    w = async function (t, n, e, i) {
      return (
        !!e && {
          profileResponded: (e = (
            await u(
              "GET",
              "https://www.linkedin.com/voyager/api/messaging/conversations/" +
                e +
                "/events",
              i,
              {
                accept: "application/vnd.linkedin.normalized+json+2.1",
                "x-restli-protocol-version": "2.0.0",
              }
            )
          ).included.filter(
            (e) =>
              "com.linkedin.voyager.messaging.Event" === e.$type &&
              "MEMBER_TO_MEMBER" === e.subtype
          )).some((e) => e["*from"].includes(t)),
          messageWasSent: 1 < e.filter((e) => e["*from"].includes(n)).length,
        }
      );
    },
    y = function (e, t) {
      var n = [],
        i = u(
          "GET",
          "https://www.linkedin.com/voyager/api/relationships/connectionsSummary",
          e.csrfToken
        ),
        r = u(
          "GET",
          "https://www.linkedin.com/voyager/api/identity/profiles/" +
            t +
            "/dashboard",
          e.csrfToken,
          {
            "x-li-track":
              '{"clientVersion":"1.1.7629","osName":"web","timezoneOffset":3,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
          }
        ),
        o = u(
          "GET",
          "https://www.linkedin.com/voyager/api/relationships/invitationsSummaryV2?types=List(SENT_INVITATION_COUNT,PENDING_INVITATION_COUNT)",
          e.csrfToken
        ),
        s = u(
          "GET",
          "https://www.linkedin.com/voyager/api/identity/panels",
          e.csrfToken
        ),
        a = u(
          "GET",
          "https://www.linkedin.com/voyager/api/identity/profiles/" +
            t +
            "/skillCategory",
          e.csrfToken
        ).then((e) =>
          e.elements[0] && e.elements[0].endorsedSkills
            ? e.elements[0].endorsedSkills.map((e) => ({
                name: e.skill.name,
                count: e.endorsementCount,
              }))
            : []
        ),
        l = k(e.csrfToken),
        t = u(
          "GET",
          "https://www.linkedin.com/voyager/api/identity/profileCompletionMeter/" +
            t,
          e.csrfToken
        ).then((e) => e.stepsToCompleteProfile.length);
      return (
        n.push(i),
        n.push(r),
        n.push(o),
        n.push(s),
        n.push(l),
        n.push(a),
        n.push(t),
        Promise.all(n).then((e) => {
          var t = e[3].elements.length
              ? e[3].elements[0].value[
                  "com.linkedin.voyager.identity.me.ProfileViewsByTimePanel"
                ].chartData
              : [],
            t = t.length ? t[t.length - 1].changePercentage : 0;
          return {
            numConnections: e[0].numConnections,
            numProfileViews: e[1].numProfileViews,
            numSearchAppearances: e[1].numSearchAppearances,
            numPendingInvitations: e[2].numTotalSentInvitations,
            changePercentage: t,
            mScore: e[4],
            skills: e[5],
            stepsToCompleteProfileNumber: e[6],
          };
        })
      );
    },
    T = function (i, o, s) {
      s = s || {};
      let a = 100 < i.length;
      return (
        (i = a ? i.slice(0, 100) : i),
        u(
          "GET",
          "https://www.linkedin.com/voyager/api/identity/profileActionsV2?ids=List(" +
            i.join(",") +
            ")",
          o,
          {
            "x-restli-protocol-version": "2.0.0",
            accept: "application/vnd.linkedin.normalized+json+2.1",
          }
        ).then((e) => {
          let r = {};
          var t,
            n = e.data.results;
          for (t in n) r[n[t]] = t;
          return (
            e.included.forEach((e) => {
              var t =
                  !!e.overflowActions &&
                  e.overflowActions.some((e) => e.action.$type === b),
                n = !!e.primaryAction && e.primaryAction.action.$type === b,
                i = !!e.secondaryAction && e.secondaryAction.action.$type === b;
              s[r[e.entityUrn].replace("*", "")] = t || n || i;
            }),
            a ? T(i, o, s) : s
          );
        })
      );
    },
    k = function (e) {
      return u("GET", "https://www.linkedin.com/sales-api/salesApiSsi", e).then(
        (e) => e.memberScore
      );
    },
    o = function (e) {
      return e
        .replaceAll(".", "")
        .replaceAll("#", "")
        .replaceAll("$", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("/", "")
        .replaceAll("\\n", "")
        .replaceAll("&quot;")
        .replaceAll("'");
    };
  (String.prototype.replaceAll = function (e, t) {
    return this.split(e).join(t);
  }),
    setTimeout(function () {
      let n = window.location.href;
      p(n).then(function (e) {
        var t = document.querySelector("#spotlight-one-nav-item a"),
          t = t ? t.getAttribute("href") : null;
        (e.isSales = n.includes("/sales") || (t && t.includes("/sales"))),
          chrome.runtime.sendMessage({ action: "passProfileData", data: e });
      });
    }, 500),
    chrome.runtime.onMessage.addListener(function (n, e, i) {
      var t, r, o, s, a;
      return (
        console.log(n.action),
        "forcePassProfileData" == n.action
          ? (p(window.location.href).then(function (e) {
              chrome.runtime.sendMessage(
                { action: "passProfileData", data: e },
                function () {
                  i(e);
                }
              );
            }),
            !0)
          : "searchProfiles" == n.action
          ? ((o = n.url),
            console.log(o),
            (a = 4e3 < o.length),
            (o = new URL(o)),
            (s = a ? o.pathname : o.toString()),
            (t = {
              "csrf-token": n.headers.csrfToken,
              "x-restli-protocol-version": "2.0.0",
              "x-requested-with": "XMLHttpRequest",
              accept: "application/json",
            }),
            a &&
              ((t["content-type"] = "application/x-www-form-urlencoded"),
              (t["x-http-method-override"] = "GET")),
            (t = {
              method: a ? "POST" : "GET",
              headers: t,
              credentials: "same-origin",
            }),
            a && (t.body = o.search.substring(1)),
            fetch(s, t)
              .then((e) => e.json())
              .then((e) => l[n.selectionType].mapResponseToProfiles(e, n))
              .then(function (e) {
                e &&
                  e.profiles &&
                  e.profiles.forEach((e) => {
                    e.id && (e.id = e.id.replace(/[\x00-\x1F\x7F-\x9F]/g, ""));
                  }),
                  i(e);
              }),
            !0)
          : "forceRefreshPendingInvitations" == n.action
          ? (C().then((e) => {
              !(async function (e, t) {
                let n = {},
                  i = await m({}, 0, t, e);
                if (!e || Object.keys(i.publicIds).length > 40)
                  n = await d({}, 0, 0, t, (t, e) => {
                    e.elements
                      .filter((e) => e.toMember && e.toMember.publicIdentifier)
                      .forEach(function (e) {
                        t[e.toMember.publicIdentifier] = true;
                      });
                  });
                return {
                  profiles: n,
                  myNetworkProfiles: i.publicIds,
                  lastAcceptedInviteDate: i.lastAcceptedInviteDate,
                };
              })(n.lastChecked.lastAcceptedInviteDate, e).then((e) => {
                i(e);
              });
            }),
            !0)
          : "forceRefreshConversations" == n.action
          ? (C().then((e) => {
              var t = {
                publicId2ConversationChecks: {},
                previousMessageEventDate: n.lastMessageEventDate,
              };
              g(t, n.userId, e).then((e) => {
                i({ conversationChecksResult: e });
              });
            }),
            !0)
          : "getProfileIdByRecruiterRef" == n.action
          ? (fetch(n.url, {
              method: "GET",
              headers: {
                "csrf-token": n.headers.csrfToken,
                "x-restli-protocol-version": "2.0.0",
                "x-requested-with": "XMLHttpRequest",
              },
              credentials: "same-origin",
            })
              .then((e) => e.text())
              .then(
                (e) =>
                  e.match(
                    /"publicLink":"https:\/\/www.linkedin.com\/in\/(.*?)"/
                  )[1]
              )
              .then((e) => {
                i({ id: e });
              }),
            !0)
          : "withdrawPendingInvitations" == n.action
          ? ((async function (e) {
              if (!e.recent)
                e.numPendingInvitations = await f(
                  e.numPendingInvitations,
                  e.headers
                );
              let t = function (e) {
                  return e.recent
                    ? 0
                    : e.numPendingInvitations - e.numberToWithdraw;
                },
                n = await d([], t(e), e.numberToWithdraw, e.headers, (e, t) => {
                  let n = t.elements.map((e) => {
                    return {
                      entityUrn: e.mailboxItemId.replace(
                        "urn:li:invitation:",
                        "urn:li:fs_relInvitation:"
                      ),
                      validationToken: "dummy",
                    };
                  });
                  e.push(...n);
                });
              await h(n, e), await p(window.location.href);
            })(n).then(i),
            !0)
          : "pingTab" != n.action
          ? "getProfileIdentity" === n.action
            ? (c(n.profileId, n.headers).then(i), !0)
            : "checkMessageWasSent" === n.action
            ? (C().then((t) =>
                c(n.profileId, t).then((e) => {
                  return (async function (e, t, n) {
                    let i = {
                        accept: "application/vnd.linkedin.normalized+json+2.1",
                        "x-restli-protocol-version": "2.0.0",
                      },
                      r = await u(
                        "GET",
                        "https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=participants&recipients=List(" +
                          e +
                          ")",
                        n,
                        i
                      ),
                      o =
                        r.data["*elements"] && r.data["*elements"].length
                          ? r.data["*elements"][0].replace(
                              "urn:li:fs_conversation:",
                              ""
                            )
                          : false;
                    return w(e, t, o, n);
                  })(
                    e.profile.entityUrn.substring(18),
                    n.userId,
                    t.csrfToken
                  ).then((e) => {
                    i({ messageWasSent: e.messageWasSent });
                  });
                })
              ),
              !0)
            : "getConversationChecks" === n.action
            ? (C().then((e) => {
                w(
                  n.profileToCheck.profileId,
                  n.userId,
                  n.profileToCheck.conversationId,
                  e.csrfToken
                ).then(i);
              }),
              !0)
            : "forceRefreshDashboard" === n.action
            ? (y(n.headers, n.userId).then(i), !0)
            : "getTalentMe" === n.action
            ? ((a = n.headers),
              u(
                "GET",
                "https://www.linkedin.com/talent/api/talentMe?decoration=%28contract~%28entityUrn%2Ctype%2Cname%2Ccreated%2ClastModified%2Caccount~%28accountLevelJobsAccess%2CentityUrn%2Cname%2CcrossContractEnabled%2Ccompany~%29%2CcontractERSStatus%2Cmoving%2Ccredits*%2Cfeatures%2CenterpriseApplicationInstance%2CofccpTrackingIdRequired%29%2Cseat~%28entityUrn%2Cstate%2Cprofile~%28entityUrn%2CfirstName%2ClastName%2Cheadline%2CprofilePicture%2CvectorProfilePicture%2CpublicProfileUrl%2CfollowerCount%2CnetworkDistance%2CautomatedActionProfile%29%2CseatEntitlements%2CseatRoles%2Ccontract%2Cdescription%2CpenaltyBoxInfo%29%2CcontractSeat%2Cprofile~%28entityUrn%2CfirstName%2ClastName%2Cheadline%2CprofilePicture%2CpublicProfileUrl%2CvectorProfilePicture%29%2CcsImpersonationType%2CusingMultipleContracts%2CenterpriseProfile%29",
                a.csrfToken
              ).then(i),
              !0)
            : "getHiringProject" === n.action
            ? ((o = n.headers),
              (s = n.url),
              u("GET", s, o.csrfToken).then(i),
              !0)
            : "getMiniProfile" === n.action
            ? ((t = n.headers),
              (r = n.profileId),
              u(
                "GET",
                "https://www.linkedin.com/voyager/api/identity/miniprofiles/" +
                  r,
                t.csrfToken
              ).then(i),
              !0)
            : "uploadAttachment" === n.action
            ? ((async function (e, t) {
                let n = await fetch(t.url).then((e) => e.blob()),
                  i = await fetch(
                    "https://www.linkedin.com/voyager/api/voyagerMediaUploadMetadata?action=upload",
                    {
                      method: "POST",
                      body: JSON.stringify({
                        fileSize: t.size,
                        filename: t.name,
                        mediaUploadType: "MESSAGING_FILE_ATTACHMENT",
                      }),
                      headers: {
                        "csrf-token": e.csrfToken,
                        "x-restli-protocol-version": "2.0.0",
                        "x-requested-with": "XMLHttpRequest",
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      credentials: "same-origin",
                    }
                  ).then((e) => e.json());
                return (
                  await fetch(i.value.singleUploadUrl, {
                    method: "PUT",
                    body: n,
                    headers: {
                      "csrf-token": e.csrfToken,
                      "x-restli-protocol-version": "2.0.0",
                      "x-requested-with": "XMLHttpRequest",
                      "Content-Type": t.type,
                    },
                    credentials: "same-origin",
                  }),
                  {
                    id: i.value.urn,
                    byteSize: t.size,
                    name: t.name,
                    mediaType: t.type,
                  }
                );
              })(n.headers, n.file).then(i),
              !0)
            : "getTalentHiringProjects" === n.action
            ? ((async function (e, t, n) {
                let i = encodeURIComponent("urn:li:ts_hiring_project:"),
                  r = encodeURIComponent(`${e},${t}`),
                  o = new URL(
                    `https://www.linkedin.com/talent/api/talentHiringProjects/${i}(${r})`
                  );
                return (
                  (o.search = new URLSearchParams({
                    altkey: "urn",
                    decoration:
                      "(entityUrn,hiringPipeline~(entityUrn,name,hiringStates*~),viewerEntitlements)",
                  }).toString()),
                  await fetch(o, {
                    method: "GET",
                    headers: {
                      "csrf-token": n.csrfToken,
                      "x-restli-protocol-version": "2.0.0",
                      "x-requested-with": "XMLHttpRequest",
                    },
                    credentials: "same-origin",
                  })
                    .then((e) => e.json())
                    .then((e) =>
                      Object.values(
                        e.hiringPipelineResolutionResult
                          .hiringStatesResolutionResults
                      ).map((e) => {
                        return {
                          statusType: e.statusType,
                          vanityName: e.vanityName,
                        };
                      })
                    )
                );
              })(n.contract, n.projectId, n.headers).then(i),
              !0)
            : void 0
          : void i({ result: !0 })
      );
    });
}
