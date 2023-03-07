{
  function k(e, t, n) {
    return fetch(
      "https://www.linkedin.com/voyager/api/messaging/conversations/" +
        encodeURIComponent(e) +
        "/events?action=create",
      {
        method: "POST",
        body: JSON.stringify(n),
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
          "content-type": "application/json; charset=UTF-8",
          "csrf-token": t.csrfToken,
          "x-requested-with": "XMLHttpRequest",
        },
        credentials: "same-origin",
      }
    );
  }
  function v(e, t) {
    return fetch(
      "https://www.linkedin.com/voyager/api/identity/profiles/" +
        e +
        "/networkinfo",
      {
        headers: {
          accept: "*/*",
          "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
          "csrf-token": t.csrfToken,
        },
        credentials: "same-origin",
      }
    )
      .then(m)
      .then(function (e) {
        return e.json();
      });
  }
  function y(t, n, i, s, e) {
    var r = [];
    let o = 0,
      a = u();
    for (
      let e = 0;
      e < s.length &&
      (s[e].endorsedByViewer ||
        (r.push(
          (function (t) {
            return new Promise(function (e) {
              setTimeout(e, t);
            });
          })(a).then(function () {
            return fetch(
              "https://www.linkedin.com/voyager/api/identity/profiles/" +
                t +
                "/normEndorsements",
              {
                method: "POST",
                body: JSON.stringify({
                  skill: {
                    entityUrn: s[e].skill.entityUrn,
                    name: s[e].skill.name,
                  },
                }),
                headers: {
                  accept: "application/json, text/javascript, */*; q=0.01",
                  "accept-language":
                    "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
                  "content-type": "application/json; charset=UTF-8",
                  "csrf-token": n.csrfToken,
                  "x-requested-with": "XMLHttpRequest",
                  "x-li-track":
                    '{"clientVersion":"1.1.8203","osName":"web","timezoneOffset":3,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
                },
                credentials: "same-origin",
              }
            )
              .then(m)
              .catch((e) => e);
          })
        ),
        (a += u()),
        ++o != i));
      e++
    );
    return Promise.all(r).then(function (e) {
      return (!e.length || 400 !== e[0].status) && 0 < o;
    });
  }
  function b(e, t, n, i, s) {
    if (e.connectByEmail)
      return "I’d like to add you to my professional network";
    var r = e.message,
      e = e.action;
    let o = c(r, "%%first_name%%", t || "");
    if (
      ((o = c(o, "%%last_name%%", n || "")),
      (t = "%%company%%"),
      (n = "%%position%%"),
      !(r = i && s) && (o.includes(t) || o.includes(n)))
    )
      throw { status: 408 };
    if (
      (o = r ? (o = o.split(t).join(i)).split(n).join(s) : o) &&
      "connect_action" === e &&
      300 < o.length
    )
      throw { status: 412 };
    return o;
  }
  "undefined" == typeof ocActContent && (ocActContent = {});
  let r = async function (n, i, s) {
      return (
        console.log(s),
        k(n, i, s)
          .then(async (e, t) =>
            e.ok
              ? e
              : (await new Promise((e) => {
                  setTimeout(e, 1e3);
                }),
                k(n, i, s))
          )
          .then(m)
          .then(function (e) {
            return e.json();
          })
      );
    },
    o = function (e, t, n) {
      return fetch(
        "https://www.linkedin.com/voyager/api/messaging/conversations?action=create",
        {
          method: "POST",
          body: JSON.stringify(n),
          headers: {
            accept: "application/json, text/javascript, */*; q=0.01",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "content-type": "application/json; charset=UTF-8",
            "csrf-token": t.csrfToken,
            "x-requested-with": "XMLHttpRequest",
          },
          credentials: "same-origin",
        }
      )
        .then(m)
        .then(function (e) {
          return e.json();
        });
    },
    e = function (e, t) {
      return fetch(
        "https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=participants&recipients=List(" +
          e +
          ")",
        {
          headers: {
            accept: "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "csrf-token": t.csrfToken,
            "x-requested-with": "XMLHttpRequest",
            "x-restli-protocol-version": "2.0.0",
          },
          credentials: "same-origin",
        }
      )
        .then(m)
        .then(function (e) {
          return e.json();
        });
    },
    a = function (e, t, n, i) {
      let s = {
        "csrf-token": n,
        "x-restli-protocol-version": "2.0.0",
        "x-requested-with": "XMLHttpRequest",
      };
      return (
        i && Object.keys(i).forEach((e) => (s[e] = i[e])),
        fetch(t, { method: e, headers: s, credentials: "same-origin" }).then(
          (e) => e.json()
        )
      );
    },
    l = function (e, t) {
      return fetch(
        "https://www.linkedin.com/voyager/api/identity/profiles/" +
          e +
          "/profileContactInfo",
        {
          headers: {
            accept: "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "csrf-token": t.csrfToken,
          },
          credentials: "same-origin",
        }
      )
        .then(m)
        .then(function (e) {
          return e.json();
        });
    },
    d = function (e, t) {
      return fetch(
        "https://www.linkedin.com/voyager/api/identity/dash/profiles?q=memberIdentity&memberIdentity=" +
          e +
          "&decorationId=com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-89",
        {
          headers: {
            accept: "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "csrf-token": t.csrfToken,
          },
          credentials: "same-origin",
        }
      )
        .then(m)
        .then(function (e) {
          return e.json();
        });
    },
    p = function (e, t) {
      var n = t.subject,
        i = { inviteeProfileUrn: "urn:li:fsd_profile:" + n.linkedinId },
        n = b(t, n.firstName, n.lastName, n.company, n.position);
      return (
        n && (i.customMessage = n),
        fetch(
          "https://www.linkedin.com/voyager/api/voyagerRelationshipsDashMemberRelationships?action=verifyQuotaAndCreate",
          {
            method: "POST",
            body: JSON.stringify(i),
            headers: {
              accept: "application/json, text/javascript, */*; q=0.01",
              "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
              "csrf-token": e.csrfToken,
              "x-li-track":
                '{"clientVersion":"1.7.7141","osName":"web","timezoneOffset":2,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
              "x-restli-protocol-version": "2.0.0",
              "x-li-page-instance":
                "urn:li:page:d_flagship3_profile_view_base;oiwvIOUHUweWEFL/ogDEfd==",
            },
            credentials: "same-origin",
          }
        ).then((e) => {
          m(e, t);
        })
      );
    },
    f = function (e) {
      let t = "com.linkedin.voyager.identity.profile.actions.InvitationPending";
      var n = !!e.overflowActions && e.overflowActions.some((e) => e.action[t]),
        i = !!e.primaryAction && e.primaryAction.action[t],
        e = !!e.secondaryAction && e.secondaryAction.action[t];
      return n || i || e;
    };
  function q(i, e) {
    return fetch("https://www.linkedin.com" + e.link, {
      headers: { "x-requested-with": "XMLHttpRequest" },
      credentials: "same-origin",
    })
      .then(m)
      .then(function (e) {
        return e.text().then(function (e) {
          let t = e.match(/"publicProfileUrl":"([^"]*)"/)[1];
          return (
            t.includes("https://www") ||
              (t = t.replace(/https:\/\/\w{2}/, "https://www")),
            fetch(t, {
              headers: { "x-requested-with": "XMLHttpRequest" },
              credentials: "same-origin",
            })
              .then(m)
              .then(function (e) {
                return e.text().then(function (e) {
                  let t = e.match(/urn:li:fs_memberBadges:([^&]*)&/)[1],
                    n = new Promise(function (e) {
                      e(t);
                    });
                  return (n =
                    t.length < 39 || 39 < t.length
                      ? fetch(
                          "https://www.linkedin.com/voyager/api/identity/profiles/" +
                            t +
                            "/profileContactInfo",
                          {
                            headers: {
                              "x-requested-with": "XMLHttpRequest",
                              "csrf-token": i.csrfToken,
                            },
                            credentials: "same-origin",
                          }
                        )
                          .then(m)
                          .then(function (e) {
                            return e.json().then(function (e) {
                              return e.entityUrn.substring(22);
                            });
                          })
                      : n);
                });
              })
          );
        });
      });
  }
  function j(t, n, i, s) {
    return e(t, s).then(async function (e) {
      return e.elements[0]
        ? (await new Promise((e) => {
            setTimeout(e, 1e3);
          }),
          r(e.elements[0].entityUrn.substring(23), s, {
            eventCreate: {
              value: {
                "com.linkedin.voyager.messaging.create.MessageCreate": {
                  assetAttachments: [],
                  attachments: i ? Object.values(i) : [],
                  attributedBody: { attributes: [], text: n },
                  body: n,
                },
              },
            },
            dedupeByClientGeneratedToken: !1,
          }))
        : o(t, s, {
            conversationCreate: {
              eventCreate: {
                value: {
                  "com.linkedin.voyager.messaging.create.MessageCreate": {
                    attachments: i ? Object.values(i) : [],
                    body: n,
                  },
                },
              },
              recipients: [t],
              subtype: "MEMBER_TO_MEMBER",
            },
            keyVersion: "LEGACY_INBOX",
          });
    });
  }
  let h = function (e, t) {
      return fetch(
        "https://www.linkedin.com/voyager/api/organization/companies/" + e,
        {
          headers: {
            accept: "*/*",
            "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
            "csrf-token": t.csrfToken,
          },
          credentials: "same-origin",
        }
      )
        .then(m)
        .then(function (e) {
          return e.json();
        });
    },
    c = function (e, t, n) {
      return e.split(t).join(n);
    },
    u = function () {
      return Math.floor(1001 * Math.random()) + 1e3;
    },
    m = function (e, t) {
      if (e.ok) return e;
      throw (t && ((e.action = t.action), (e.subject = t.subject)), e);
    },
    g = function (e, t, n) {
      e = e.subject;
      n && (e.publicId = n),
        (e.status = "Processed"),
        t({ result: "success", subject: e });
    },
    w = function (e, t) {
      return (
        console.log(e.status),
        "message_action" === t.action && 422 === e.status
          ? "Not a 1st connection"
          : 406 === e.status
          ? "Already sent"
          : 407 === e.status
          ? "Not a 1st connection"
          : 408 === e.status
          ? "No company found"
          : 409 === e.status
          ? "User responded"
          : 410 === e.status
          ? "Duplicate message"
          : 411 === e.status
          ? "Profile not available"
          : 412 === e.status
          ? "Message > 300 symbols"
          : 429 === e.status
          ? "Too many requests"
          : 400 === e.status && "connect_action" === e.action
          ? "Unable to connect"
          : 413 === e.status
          ? "No email"
          : "Error"
      );
    };
  chrome.runtime.onMessage.addListener(function (c, e, u) {
    let t;
    c.subject &&
      (t = c.subject.link.includes("/sales/profile") ? "sales" : "default");
    let n;
    var i,
      s = new Promise(function (e) {
        chrome.runtime.sendMessage({ action: "getHeaders" }, e);
      });
    if ("connect_action" === c.action)
      n =
        "sales" == t
          ? s.then(function (a) {
              return q(a, c.subject).then(function (t) {
                {
                  var n = c,
                    i = c.message,
                    s = a,
                    r = u,
                    o = t;
                  let e = n.subject.link.replace("/sales/profile/", "");
                  return (
                    (t = (e =
                      -1 != e.indexOf("?")
                        ? e.substring(0, e.indexOf("?"))
                        : e).split(",")),
                    fetch("https://www.linkedin.com/sales/profile/connect", {
                      method: "POST",
                      body: JSON.stringify({
                        authToken: t[1],
                        authType: t[2],
                        message: i,
                        profileId: t[0],
                      }),
                      headers: {
                        accept:
                          "application/json, text/javascript, */*; q=0.01",
                        "accept-language":
                          "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
                        "content-type": "application/json; charset=UTF-8",
                        "csrf-token": s.csrfToken,
                        "x-requested-with": "XMLHttpRequest",
                      },
                      credentials: "same-origin",
                    })
                      .then(m)
                      .then(function () {
                        g(n, r, o);
                      })
                  );
                }
              });
            })
          : s.then(async function (e) {
              var t = c.subject,
                n =
                  ("DISTANCE_1" === (await v(t.linkedinId, e)).distance.value &&
                    m({ ok: !1, status: 406 }),
                  t.publicId);
              (n = await fetch(
                "https://www.linkedin.com/voyager/api/identity/profiles/" +
                  n +
                  "/profileActions",
                {
                  headers: {
                    "x-restli-protocol-version": "2.0.0",
                    "x-requested-with": "XMLHttpRequest",
                    "csrf-token": e.csrfToken,
                  },
                  credentials: "same-origin",
                }
              )
                .then(m)
                .then(function (e) {
                  return e.json();
                })),
                await (!f(n) || !m({ ok: !1, status: 406 }));
              let i;
              var s,
                r,
                n = {
                  emberEntityName: "growth/invitation/norm-invitation",
                  invitee: (function (e, t) {
                    var n = e.connectByEmail;
                    if (n && !e.subject.email) throw { status: 413 };
                    var i = {},
                      e =
                        ((i[n ? "email" : "profileId"] = n
                          ? e.subject.email
                          : t),
                        {});
                    return (
                      (e[
                        n
                          ? "com.linkedin.voyager.growth.invitation.InviteeEmail"
                          : "com.linkedin.voyager.growth.invitation.InviteeProfile"
                      ] = i),
                      e
                    );
                  })(c, t.linkedinId),
                  message: b(c, t.firstName, t.lastName, t.company, t.position),
                  trackingId: t.trackingId,
                };
              return (
                (i = c.connectByEmail ? { invitations: [n] } : n),
                (t = i),
                (s = e),
                (r = c),
                fetch(
                  "https://www.linkedin.com/voyager/api/growth/normInvitations" +
                    (r.connectByEmail ? "?action=batchCreate" : ""),
                  {
                    method: "POST",
                    body: JSON.stringify(t),
                    headers: {
                      accept: "application/json, text/javascript, */*; q=0.01",
                      "accept-language":
                        "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
                      "csrf-token": s.csrfToken,
                      "x-li-track":
                        '{"clientVersion":"1.7.7141","osName":"web","timezoneOffset":2,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',
                      "x-restli-protocol-version": "2.0.0",
                      "x-li-page-instance":
                        "urn:li:page:d_flagship3_profile_view_base;oiwvIOUHUweWEFL/ogDEfd==",
                    },
                    credentials: "same-origin",
                  }
                )
                  .then((e) => {
                    if (!r.connectByEmail && 429 === e.status) return p(s, r);
                    m(e, r);
                  })
                  .then(() => {
                    g(c, u);
                  })
              );
            });
    else if ("message_action" === c.action)
      n =
        "sales" == t
          ? s.then(function (e) {
              return q(e, c.subject).then(function (s) {
                return (
                  (c.subject.publicId = s),
                  j(s, c.message, null, e).then(function (e) {
                    var t = u,
                      n = c.subject,
                      i = s;
                    i && (n.publicId = i);
                    (n.status = e ? "Processed" : "Error"),
                      t({ result: "success", subject: n });
                  })
                );
              });
            })
          : s.then(function (t) {
              let n = c.subject,
                i = b(c, n.firstName, n.lastName, n.company, n.position);
              return (function (t, n, i) {
                let s = {
                  accept: "application/vnd.linkedin.normalized+json+2.1",
                  "x-restli-protocol-version": "2.0.0",
                };
                return a(
                  "GET",
                  "https://www.linkedin.com/voyager/api/messaging/conversations?keyVersion=LEGACY_INBOX&q=participants&recipients=List(" +
                    t +
                    ")",
                  n,
                  s
                )
                  .then(
                    (e) =>
                      !(!e.data["*elements"] || !e.data["*elements"].length) &&
                      e.data["*elements"][0].replace(
                        "urn:li:fs_conversation:",
                        ""
                      )
                  )
                  .then(
                    (e) =>
                      !!e &&
                      a(
                        "GET",
                        "https://www.linkedin.com/voyager/api/messaging/conversations/" +
                          e +
                          "/events",
                        n,
                        s
                      ).then((e) => {
                        e = e.included.filter(
                          (e) =>
                            "com.linkedin.voyager.messaging.Event" ===
                              e.$type && "MEMBER_TO_MEMBER" === e.subtype
                        );
                        return {
                          profileResponded: e.some((e) =>
                            e["*from"].includes(t)
                          ),
                          hasDuplicateMessages: e.some(
                            (e) =>
                              e.eventContent.attributedBody &&
                              0.9 <=
                                compareTwoStrings(
                                  e.eventContent.attributedBody.text,
                                  i
                                )
                          ),
                        };
                      })
                  );
              })(n.linkedinId, t.csrfToken, i).then(
                (e) => (
                  c.skipResponded &&
                    e.profileResponded &&
                    m({ ok: !1, status: 409 }),
                  e.hasDuplicateMessages && m({ ok: !1, status: 410 }),
                  j(n.linkedinId, i, c.attachments, t).then(function (e) {
                    g(c, u, n.publicId);
                  })
                )
              );
            });
    else {
      if ("endorse_action" === c.action)
        return (
          (n = s.then(function (t) {
            return (
              (e = c.subject.id),
              fetch(
                "https://www.linkedin.com/voyager/api/identity/profiles/" +
                  e +
                  "/featuredSkills?includeHiddenEndorsers=true&count=50",
                {
                  headers: {
                    accept: "*/*",
                    "accept-language":
                      "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
                    "csrf-token": t.csrfToken,
                  },
                  credentials: "same-origin",
                }
              )
                .then(m)
                .then((e) =>
                  e.json().then(function (e) {
                    return e.elements;
                  })
                )
                .then(function (e) {
                  return y(
                    c.subject.id,
                    t,
                    -1 == c.skillsNumber ? e.length - 1 : c.skillsNumber,
                    e
                  ).then(function (e) {
                    (c.subject.status = e ? "Processed" : "Error"), g(c, u);
                  });
                })
                .catch(() => {
                  (c.subject.status = "Error"),
                    u({ result: "success", subject: c.subject });
                })
            );
            var e;
          })),
          !0
        );
      "checkActionContent" === c.action
        ? u({ result: "exists" })
        : "visit_action" == c.action
        ? (n = s.then((n) =>
            v(c.subject.id, n).then((e) => {
              let t = e.followingInfo.trackingUrn.replace("urn:li:member:", "");
              return a(
                "GET",
                "https://www.linkedin.com/voyager/api/me",
                n.csrfToken
              ).then((e) => {
                (e = e.plainId),
                  (e = {
                    eventInfo: {
                      appId: "com.linkedin.flagship3.d_web",
                      eventName: "ProfileViewEvent",
                      topicName: "ProfileViewEvent",
                    },
                    eventBody: {
                      viewerPrivacySetting: "F",
                      vieweeMemberUrn: "urn:li:member:" + e,
                      entityView: {
                        viewType: "profile-view",
                        viewerId: e,
                        targetId: parseInt(t),
                      },
                      requestHeader: {
                        interfaceLocale: "en_US",
                        pageKey: "d_flagship3_profile_view_base",
                        path: "/in/feed/?trk=guest_homepage-basic_sign-in-submit",
                        referer: "https://www.linkedin.com/",
                      },
                    },
                  });
                return fetch("https://www.linkedin.com/li/track", {
                  method: "POST",
                  body: JSON.stringify(e),
                  headers: {
                    "csrf-token": n.csrfToken,
                    "x-restli-protocol-version": "2.0.0",
                    "x-requested-with": "XMLHttpRequest",
                  },
                  credentials: "same-origin",
                }).then(() => {
                  g(c, u);
                });
              });
            })
          ))
        : "removeTab" == c.action
        ? ((i = new Event("beforeunload", { detail: { noPopup: !0 } })),
          window.dispatchEvent(i))
        : "getSyncLeadData" == c.action &&
          (n = s.then(function (e) {
            return (async function (e, t) {
              var n = {},
                i = await d(e, t),
                s = i.elements[0],
                i =
                  ((n.FIRST_NAME = i),
                  (n.EMAIL = await l(e, t)),
                  s.profilePositionGroups.elements);
              return (
                i.length &&
                  i[0].companyUrn &&
                  ((e = i[0].companyUrn.replace("urn:li:fsd_company:", "")),
                  (n.COMPANY_WEBSITE = await h(e, t).catch(() => ({})))),
                { leadData: n, leadId: s.entityUrn.substring(19) }
              );
            })(c.id, e).then(u);
          }));
    }
    if (n)
      return (
        n.catch(function (e) {
          var t, n;
          console.error(e),
            (e = e),
            (n = u),
            ((t = c).subject.status = w(e, t)),
            n({ result: "success", subject: t.subject });
        }),
        !0
      );
  });
}
