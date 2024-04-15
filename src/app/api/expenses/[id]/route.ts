import cerbos from "@/lib/cerbos-server";
import { expense } from "@/lib/example-data";
import { NextResponse } from "next/server";

export async function GET(req: Request, params: { id: string }) {
  console.log("GET request received for expense with ID:", params.id);

  // 1) authn check: get user info (from Kinde, Okta/Auth0, NextAuth, etc.)
  // const user = await getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  const user = {
    id: "clsdcjf06000008lccu6ud5et",
    name: "Lisa",
    roles: ["USER"],
  };
  console.log("User information:", user);

  // 2) get resource info (from database)
  // const expense = await prisma.expense.findUnique({
  //   where: { id: params.id },
  // });
  const expense = {
    id: "6354645",
    description: "Lunch with team",
    amount: 300,
    status: "PENDING",
    createdBy: "clsdcjf06000008lccu6ud5et",
  };
  console.log("Expense information:", expense);

  // 3) authz check
  const decision = await cerbos.checkResource({
    principal: {
      id: user.id,
      roles: user.roles,
      attr: user,
    },
    resource: {
      id: expense.id,
      kind: "expense",
      attr: expense,
    },
    actions: ["edit"],
  });
  console.log(
    "Authorization decision for viewing expense:",
    decision.isAllowed("edit")
  );

  if (!decision.isAllowed("edit")) {
    console.log("User is not authorized to view the expense");
    return NextResponse.json(
      {
        error: "Not authorized.",
      },
      {
        status: 403,
      }
    );
  }

  // 4) return expense for viewing
  console.log("Returning expense data:", expense);
  return NextResponse.json(expense);
}

export async function PUT(req: Request) {
  console.log("PUT request received");

  // 1) authn check: get user info (from Kinde, Okta/Auth0, NextAuth, etc.)
  // const user = await getUser();
  // if (!user) {
  //   redirect("/login");
  // }
  const user = {
    id: "clsdcjf06000008lccu6ud5et",
    name: "Lisa",
    roles: ["USER"],
  };
  console.log("User information:", user);

  // 2) get resource info (from database)
  // const expense = await prisma.expense.findUnique({
  //   where: { id: params.id },
  // });
  const expense = {
    id: "6354645",
    description: "Lunch with team",
    amount: 300,
    status: "PENDING",
    createdBy: "clsdcjf06000008lccu6ud5et",
  };
  console.log("Expense information:", expense);

  // 3) authz check
  const decision = await cerbos.checkResource({
    principal: {
      id: user.id,
      roles: user.roles,
      attr: user,
    },
    resource: {
      id: expense.id,
      kind: "expense",
      attr: expense,
    },
    actions: ["approve"],
  });
  console.log(
    "Authorization decision for approving expense:",
    decision.isAllowed("approve")
  );

  if (!decision.isAllowed("approve")) {
    console.log("User is not authorized to approve the expense");
    return NextResponse.json(
      {
        error: "Not authorized.",
      },
      {
        status: 403,
      }
    );
  }

  // update database
  // const { approved } = await req.json();

  // await prisma.expense.update({
  //   where: { id: params.id },
  //   data: {
  //     status: approved,
  //   },
  // });
  console.log("Expense approval status updated in the database");
}
