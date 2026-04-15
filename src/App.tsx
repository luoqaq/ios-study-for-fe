import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";

// Home
import Home from "@/pages/Home";

// Guide
import GuideIndex from "@/pages/guide/GuideIndex";
import BeforeStart from "@/pages/guide/BeforeStart";

// ObjC
import ObjcIndex from "@/pages/objc/ObjcIndex";
import ObjcIntro from "@/pages/objc/basics/Intro";
import DataTypes from "@/pages/objc/basics/DataTypes";
import ObjcStrings from "@/pages/objc/basics/Strings";
import ObjcArrays from "@/pages/objc/basics/Arrays";
import ObjcControlFlow from "@/pages/objc/basics/ControlFlow";
import ObjcFunctions from "@/pages/objc/basics/Functions";
import ObjcClassObject from "@/pages/objc/oop/ClassObject";
import ObjcInheritance from "@/pages/objc/oop/Inheritance";
import ObjcProtocol from "@/pages/objc/oop/Protocol";
import ObjcCategory from "@/pages/objc/oop/Category";
import ObjcProperty from "@/pages/objc/oop/Property";
import ObjcArc from "@/pages/objc/memory/Arc";
import ObjcRetainCycle from "@/pages/objc/memory/RetainCycle";
import ObjcKvo from "@/pages/objc/advanced/Kvo";
import ObjcDelegate from "@/pages/objc/advanced/Delegate";
import ObjcNotification from "@/pages/objc/advanced/Notification";

// Swift
import SwiftIndex from "@/pages/swift/SwiftIndex";
import SwiftDataTypes from "@/pages/swift/basics/DataTypes";
import SwiftOptionals from "@/pages/swift/basics/Optionals";
import SwiftStrings from "@/pages/swift/basics/Strings";
import SwiftCollections from "@/pages/swift/basics/Collections";
import SwiftControlFlow from "@/pages/swift/basics/ControlFlow";
import SwiftClassStruct from "@/pages/swift/oop/ClassStruct";
import SwiftEnum from "@/pages/swift/oop/Enum";
import SwiftProtocol from "@/pages/swift/oop/Protocol";
import SwiftExtension from "@/pages/swift/oop/Extension";
import SwiftGenerics from "@/pages/swift/oop/Generics";
import SwiftClosure from "@/pages/swift/advanced/Closure";
import SwiftConcurrency from "@/pages/swift/advanced/Concurrency";
import SwiftErrorHandling from "@/pages/swift/advanced/ErrorHandling";
import SwiftPropertyWrapper from "@/pages/swift/advanced/PropertyWrapper";
import SwiftUIIntro from "@/pages/swift/swiftui/Intro";
import SwiftUIStateBinding from "@/pages/swift/swiftui/StateBinding";

// Xcode
import XcodeIndex from "@/pages/xcode/XcodeIndex";
import XcodeSetup from "@/pages/xcode/Setup";
import XcodeInterface from "@/pages/xcode/Interface";
import XcodeProject from "@/pages/xcode/Project";
import XcodeSimulator from "@/pages/xcode/Simulator";
import XcodeDebugging from "@/pages/xcode/Debugging";
import XcodeStoryboard from "@/pages/xcode/Storyboard";
import XcodeBuildRun from "@/pages/xcode/BuildRun";

// Practice
import PracticeIndex from "@/pages/practice/PracticeIndex";
import TodoApp from "@/pages/practice/TodoApp";
import NetworkApp from "@/pages/practice/NetworkApp";
import TableViewApp from "@/pages/practice/TableViewApp";
import MiniSwiftUI from "@/pages/practice/MiniSwiftUI";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        {/* Guide */}
        <Route path="/guide" element={<GuideIndex />} />
        <Route path="/guide/before-start" element={<BeforeStart />} />

        {/* ObjC */}
        <Route path="/objc" element={<ObjcIndex />} />
        <Route path="/objc/basics/intro" element={<ObjcIntro />} />
        <Route path="/objc/basics/functions" element={<ObjcFunctions />} />
        <Route path="/objc/basics/datatypes" element={<DataTypes />} />
        <Route path="/objc/basics/strings" element={<ObjcStrings />} />
        <Route path="/objc/basics/arrays" element={<ObjcArrays />} />
        <Route path="/objc/basics/control-flow" element={<ObjcControlFlow />} />

        <Route
          path="/objc/oop/class-object"
          element={<ObjcClassObject />}
        />
        <Route
          path="/objc/oop/inheritance"
          element={<ObjcInheritance />}
        />
        <Route
          path="/objc/oop/protocol"
          element={<ObjcProtocol />}
        />
        <Route
          path="/objc/oop/category"
          element={<ObjcCategory />}
        />
        <Route
          path="/objc/oop/property"
          element={<ObjcProperty />}
        />

        <Route
          path="/objc/memory/arc"
          element={<ObjcArc />}
        />
        <Route
          path="/objc/memory/retain-cycle"
          element={<ObjcRetainCycle />}
        />

        <Route
          path="/objc/advanced/kvo"
          element={<ObjcKvo />}
        />
        <Route
          path="/objc/advanced/delegate"
          element={<ObjcDelegate />}
        />
        <Route
          path="/objc/advanced/notification"
          element={<ObjcNotification />}
        />

        {/* Swift */}
        <Route path="/swift" element={<SwiftIndex />} />
        <Route path="/swift/basics/datatypes" element={<SwiftDataTypes />} />
        <Route path="/swift/basics/optionals" element={<SwiftOptionals />} />
        <Route path="/swift/basics/strings" element={<SwiftStrings />} />
        <Route
          path="/swift/basics/collections"
          element={<SwiftCollections />}
        />
        <Route
          path="/swift/basics/control-flow"
          element={<SwiftControlFlow />}
        />

        <Route path="/swift/oop/class-struct" element={<SwiftClassStruct />} />
        <Route path="/swift/oop/enum" element={<SwiftEnum />} />
        <Route path="/swift/oop/protocol" element={<SwiftProtocol />} />
        <Route path="/swift/oop/extension" element={<SwiftExtension />} />
        <Route path="/swift/oop/generics" element={<SwiftGenerics />} />

        <Route path="/swift/advanced/closure" element={<SwiftClosure />} />
        <Route
          path="/swift/advanced/concurrency"
          element={<SwiftConcurrency />}
        />
        <Route
          path="/swift/advanced/error-handling"
          element={<SwiftErrorHandling />}
        />
        <Route
          path="/swift/advanced/property-wrapper"
          element={<SwiftPropertyWrapper />}
        />

        <Route
          path="/swift/swiftui/intro"
          element={<SwiftUIIntro />}
        />
        <Route
          path="/swift/swiftui/state-binding"
          element={<SwiftUIStateBinding />}
        />

        {/* Xcode */}
        <Route path="/xcode" element={<XcodeIndex />} />
        <Route
          path="/xcode/setup"
          element={<XcodeSetup />}
        />
        <Route
          path="/xcode/interface"
          element={<XcodeInterface />}
        />
        <Route
          path="/xcode/project"
          element={<XcodeProject />}
        />
        <Route
          path="/xcode/simulator"
          element={<XcodeSimulator />}
        />
        <Route
          path="/xcode/debugging"
          element={<XcodeDebugging />}
        />
        <Route
          path="/xcode/storyboard"
          element={<XcodeStoryboard />}
        />
        <Route
          path="/xcode/build-run"
          element={<XcodeBuildRun />}
        />

        {/* Practice */}
        <Route path="/practice" element={<PracticeIndex />} />
        <Route path="/practice/todo-app/intro" element={<TodoApp />} />
        <Route path="/practice/network-app/intro" element={<NetworkApp />} />
        <Route
          path="/practice/tableview-app/intro"
          element={<TableViewApp />}
        />
        <Route path="/practice/mini-swiftui/intro" element={<MiniSwiftUI />} />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
